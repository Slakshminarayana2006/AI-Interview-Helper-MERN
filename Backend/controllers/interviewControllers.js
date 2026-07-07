const interViewSchema = require('../models/interviewModel');
const pdfparse = require('pdf-parse');
const fs = require('fs');
const {generateInterviewReport, generateResumePdf} = require('../services/ai.service');
const puppeteer = require('puppeteer');

const getResumeAndDescription = async(req, res) => {

    try {
        const {selfDescription, jobDescription} = req.body;
        const resumePDF = req.files?.resumePdf?.[0]?.path;

        if((!selfDescription && !resumePDF) && !jobDescription) {
            return res.status(400).json({
                success : false,
                message : "Give resume or self description"
            })
        }

        let resumeText = '';

        if(resumePDF) {
            const bufferData = fs.readFileSync(resumePDF);
            if(!bufferData) {
                return res.status(400).json({
                    success : false,
                    message : "data converting to buffer failed"
                })
            }
            const pdfdata = await (new pdfparse.PDFParse({data : bufferData})).getText();
            console.log(pdfdata);
            if(!pdfdata) {
                return res.status(400).json({
                    success : false,
                    message : "failed buffer to data"
                })
            }

            resumeText += pdfdata.text;

        }

        console.log(resumeText);

        const InterviewReport = await generateInterviewReport({resume : resumeText, jobDescription, selfDescription});

        if(!InterviewReport) {
            return res.status(400).json({
                success : false,
                message : "integeration of llm api failed "
            })
        }

        const InterviewToDB = await interViewSchema.create({
            jobDescription,
            resume : resumeText,
            selfDescription,
            ...InterviewReport,
            user : req.user._id
        })

        if(!InterviewToDB) {
            return res.status(400).json({
                success : false,
                message : "internal issue"
            })
        }

        const generatedReport = await interViewSchema.findById(InterviewToDB._id);

        if(!generatedReport) {
            return res.status(400).json({
                success : false,
                message : "internal issue"
            })
        }
        
        return res.status(200).json({
            success : true,
            message : "generated successfully",
            generatedReport
        })
    } catch (error) {
        console.log(error);
    }
}

const getReportById = async (req, res) => {
    try {
        const {reportId} = req.params;

        if(!reportId) {
            return res.status(400).json({
                success : false,
                message : "Internal error"
            })
        }

        const getReport = await interViewSchema.findById(reportId).select("-jobDescription -selfDescription -resume")

        if(!getReport) {
            return res.status(400).json({
                success : false,
                message : "fetch not done",
            })
        }

        return res.status(200).json({
            success : true,
            message : "successfully fetched",
            getReport
        })
    } catch (error) {
        console.log(error);
    }
}


const getAllReportsOfAUser = async (req, res) => {
    try {
        const id = req.user.id;
        if(!id) {
            return res.status(400).json({
                success : false,
                message : "Internal error"
            })
        }

        const getAllReports = await interViewSchema.find({user : id}).sort({createdAt : -1}).select("-jobDescription -selfdescription -resume");

        if(!getAllReports) {
            return res.status(400).json({
                success : false,
                message : "Internal error"
            })
        }

        return res.status(200).json({
            success : true,
            message : "successfully fetched",
            getAllReports
        })
    } catch (error) {
        console.log(error);
    }
}

const getResumePdf = async (req, res) => {
    const {interviewId} = req.params;
    if(!interviewId) {
        return res.status(400).json({
            success : false,
            message : "report not found"
        })
    }

    const generatedReport = await interViewSchema.findById(interviewId).select("resume jobDescription selfDescription");

    if(!generatedReport) {
        return res.status(400).json({
            success : false,
            message : "report not found"
        })
    }

    const htmlText = await generateResumePdf(generatedReport);
    if(!htmlText) {
        return res.status(400).json({
            message : "internal error",
            success : false
        })
    }

    let browser;

    try {
        browser = await puppeteer.launch({
            executablePath:
                process.env.NODE_ENV === "production"
                    ? undefined
                    : "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
            headless: true,
            args: ["--no-sandbox", "--disable-setuid-sandbox"],
        });

        const page = await browser.newPage();

        await page.setContent(htmlText.html, {
            waitUntil: "networkidle0",
        });

        const pdf = await page.pdf({
            format: "A4",
            printBackground: true,
            
        });

        res.set({
            "Content-Type": "application/pdf",
            "Content-Disposition": "attachment; filename=report.pdf",
        });

        return res.send(pdf);

    } finally {
        if (browser) {
            await browser.close();
        }
    }
}

module.exports = {
    getResumeAndDescription,
    getReportById,
    getAllReportsOfAUser,
    getResumePdf
}