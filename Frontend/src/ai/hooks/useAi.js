import { useContext } from "react"
import { getAllReportsOfAUser, generateInterviewReport, getReportById, getDownloadedPdf} from "../services/ai.service"
import { AiContext, AiProvider } from "../AiContext"

const useAi = () => {
    const {loading, setLoading, report, setReport, allReports, setAllReports} = useContext(AiContext);

    const handleGenerateReport = async ({resume, selfDescription, jobDescription}) => {
        setLoading(true);
        try {
            const response  = await generateInterviewReport({resume, selfDescription, jobDescription})
            setReport(response);
            return response;
        } catch (error) {
            throw error
        }
        finally {
            setLoading(false);
        }
    }

    const handleGetReportById = async (reportId) => {
        setLoading(true);
        try {
            const response = await getReportById(reportId);
            setReport(response);
        } catch (error) {
            throw error;
        }
        finally {
            setLoading(false);
        }
    }

    const handleGetAllReportsOfAUser = async () => {
        setLoading(true);
        try {
            const response = await getAllReportsOfAUser();
            console.log("API Response:", response);
            setAllReports(response);
        } catch (error) {
            throw error;
        }
        finally {
            setLoading(false);
        }
    }
    
const handleDownload = async (interviewId) => {
    const response = await getDownloadedPdf(interviewId);

    if (!(response instanceof Blob) || response.size === 0) {
        throw new Error("Invalid or empty PDF received from server");
    }

    const url = URL.createObjectURL(response);

    try {
        const a = document.createElement("a");
        a.href = url;
        a.download = "Resume.pdf";

        document.body.appendChild(a);
        a.click();
        a.remove();
    } finally {
        URL.revokeObjectURL(url);
    }
};


    return {loading, setLoading, report, setReport, allReports, setAllReports, handleGenerateReport, handleGetReportById, handleGetAllReportsOfAUser, handleDownload}
}

export default useAi;
