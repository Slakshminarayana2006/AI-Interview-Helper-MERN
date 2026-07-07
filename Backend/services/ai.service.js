const { GoogleGenAI } = require('@google/genai');
const {z} = require('zod');
const {zodToJsonSchema} = require('zod-to-json-schema');
const { resume, jobDescription, selfDescription } = require('./temp');

const ai = new GoogleGenAI({
    apiKey : process.env.GOOGLE_GEMINI_API_KEY
})


const zodInterViewSchema = z.object({
    role : z.string().describe("the role for which the candidate is being interviewed"),
    matchScore : z.number().min(0).max(100).describe("The match score between the candidate's profile and the job description, calculated based on various factors such as skills, experience, etc. it should be a number between 0 and 100"),
    technicalQuestions : z.array(z.object({
        question : z.string().describe("The technical question can be asked in the interview"),
        intention : z.string().describe("The intension of the interview behind asking this question"),
        answer : z.string().describe("How to answer this question, what points to cover, what approach to take etc.")
    })).describe('Technical questions that can be asked in the interview along with their intention and the answers'),
    behaviouralQuestions : z.array(z.object({
        question : z.string().describe("The behavioural question can be asked in the interview"),
        intention : z.string().describe("The intension of the interview behind asking this question"),
        answer : z.string().describe("How to answer this question, what points to cover, what approach to take etc.")
    })).describe('Behavioural questions that can be asked in the interview along with their intention and the answers'),
    skillGap : z.array(z.object({
        skill : z.string().describe("The skill which the candidate is lacking"),
        severity : z.enum(["low", "medium", "high"]).describe("The severity of this skill gap")
    })).describe("List of skill gaps in the candidate's profile along their severity"),
    preparationPlan : z.array(z.object({
        day : z.number().describe("The day number in the preparation plan, starting from from 1"),
        focus : z.string().describe("The main focus of this day in the preparation plan"),
        tasks : z.array(z.string()).describe("The list of tasks to be done on this day in the preparation plan")
    })).describe("The day-wise preparation plan for the candidate to prepare for the interview")
})

const zodSchemaForResumeGeneration = z.object({
    html : z.string().describe("generated html for the resume which can be converted to pdf")
})


const generateInterviewReport = async ({resume, jobDescription, selfDescription}) =>  {

    const prompt = `You are an experienced Technical Recruiter and Hiring Manager. Analyze the candidate's resume, job description, and self-description.
Resume:
${resume}

Job Description:
${jobDescription}

Self Description:
${selfDescription}

Tasks:
- Calculate a realistic match score (0-100).
- Generate at least 5 technical questions and 5 behavioral questions.
- Cover projects, Java, JavaScript, React, Node.js, Express.js, MongoDB, SQL, OOP, DBMS, OS, CN, DSA, Algorithms, Problem Solving, and System Design when relevant.
- Include detailed answers, intentions, difficulty, topics, and follow-up questions.
- Identify skill gaps with learning resources and estimated learning time.
- Create a 8-day preparation plan.
- Provide ATS-focused resume feedback.
- Predict likely interview rounds.
- Rank the highest-priority topics for preparation.
- Determine the role of the candidate based on the resume and job description.

Be accurate, practical, and tailored to the candidate profile and job description.
    `
    try {
        const response = await ai.models.generateContent({
            model : 'gemini-2.5-flash',
            contents : prompt,
            config : {
                responseMimeType : "application/json",
                responseJsonSchema : z.toJSONSchema(zodInterViewSchema)
            }
        })

        console.log(response.text);
        return JSON.parse(response.text);
    } catch (error) {
        console.log(error);
    }
    
}

const generateResumePdf = async ({resume, jobDescription, selfDescription}) => {
    const prompt = `You are an experienced Technical Recruiter and Hiring Manager.
Analyze the candidate's resume, job description, and self-description, then generate a professional, ATS-friendly resume in HTML format.
Resume:
${resume}
Job Description:
${jobDescription}
Self Description:
${selfDescription}
Requirements:
- Generate only the HTML document. Do not include explanations or markdown.
- Use a single HTML file with inline CSS only.
- Ensure compatibility with HTML-to-PDF conversion while preserving formatting.
- Limit the resume to one page.
- Use a clean black-and-white color scheme.
- Tailor the resume to the provided job description by emphasizing the most relevant skills, experience, achievements, and keywords.
- Write in a natural, human-like, professional tone. The resume should not appear AI-generated.
- Make it ATS-optimized, concise, clear, and easy to scan by recruiters.
- Include these sections where applicable:
  - Header (Name, Contact Information, Links)
  - Professional Summary
  - Skills
  - Work Experience / Projects
  - Education
  - Certifications
  - Achievements or other relevant sections
- Use a clean, modern layout with appropriate headings, spacing, and bullet points.
- Ensure the content is grammatically correct, consistent, and free of typos.
- Highlight the candidate's strengths, measurable achievements, and unique value proposition while aligning with the target role.
Generate a complete HTML document.

The HTML must contain this CSS inside the <style> tag:

<style>
@page {
  size: A4;
  margin: 14mm;
}

body {
  font-family: Arial, Helvetica, sans-serif;
  margin: 0;
  padding: 0;
  color: #111;
  font-size: 11px;
  line-height: 1.5;
}

* {
  box-sizing: border-box;
}

.resume {
  width: 100%;
}

h1 {
  font-size: 24px;
  margin: 0;
}

h2 {
  font-size: 14px;
  margin: 10px 0 5px;
  margin-top: 12px;
    margin-bottom: 6px;
}

p,
li {
  font-size: 11px;
  margin-bottom: 4px;
}

section {
  page-break-inside: avoid;
   margin-bottom: 14px;
}
</style>
The generated resume should occupy approximately 90–95% of a single A4 page.

If the resume is shorter than one page, expand the content naturally by:
- Writing a stronger professional summary (3–4 lines).
- Adding more relevant bullet points to projects (4–5 bullets each).
- Expanding achievements with measurable impact.
- Adding relevant coursework or technical strengths if applicable.
- Elaborating on responsibilities and accomplishments without adding fake information.

Do not leave large blank spaces at the bottom of the page.
    `
    try {
        const response = await ai.models.generateContent({
            model : 'gemini-2.5-flash',
            contents : prompt,
            config : {
                responseMimeType : "application/json",
                responseJsonSchema : z.toJSONSchema(zodSchemaForResumeGeneration)
            }
        })

        console.log(response.text);
        return JSON.parse(response.text);
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    generateInterviewReport,
    generateResumePdf
};