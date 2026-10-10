import axios from 'axios'

const api = axios.create({
    baseURL : "https://ai-interview-helper-mern.onrender.com",
    withCredentials : true
})


const generateInterviewReport = async ({resume, selfDescription, jobDescription}) => {
    try {
        const formData = new FormData();
        formData.append("jobDescription", jobDescription);
        formData.append("selfDescription", selfDescription);
        formData.append("resumePdf", resume);
        
        const response = await api.post('/api/interview/interview-data', formData, {
            headers : {
                "Content-Type" : "multipart/form-data"
            }
        })
        return response.data.generatedReport;
    } catch (error) {
        console.log(error.response?.data);
        console.log(error.response?.status);
        throw error;
    }
}
const getReportById = async (reportId) => {
    try {
        const response = await api.get(`/api/interview/getReportsById/${reportId}`)
        return response.data.getReport
    } catch (error) {
        throw error;
    }
    
}

const getAllReportsOfAUser = async() => {
    try {
        const response = await api.get('/api/interview/getAllReport')
        return response.data.getAllReports
    } catch (error) {
        throw error;
    }
}


const getDownloadedPdf = async (interviewId) => {
    try {
        const response = await api.get(
            `/api/interview/getresume/${interviewId}`,
            {
                responseType: "blob"
            }
        );

        return response.data;
    } catch (error) {
        console.error("PDF API status:", error.response?.status);

        if (error.response?.data instanceof Blob) {
            console.error(
                "PDF API error details:",
                await error.response.data.text()
            );
        } else {
            console.error("PDF API error:", error.message);
        }

        throw error;
    }
};

export {
    generateInterviewReport,
    getReportById,
    getAllReportsOfAUser, 
    getDownloadedPdf
}
