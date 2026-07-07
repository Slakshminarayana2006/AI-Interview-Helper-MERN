import { createContext, useState } from "react";

export const AiContext = createContext();

export const AiProvider = ({children}) => {
    const[loading, setLoading] = useState(false);
    const[report, setReport] = useState(null);
    const[allReports, setAllReports] = useState([]);

    return(
        <AiContext.Provider value={{loading, setLoading, report, allReports, setReport, setAllReports}} >
            {children}
        </AiContext.Provider>
    )

}