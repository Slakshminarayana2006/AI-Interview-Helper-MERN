import { createContext, useEffect, useState } from "react";
import { getUser } from "./services/auth.api";

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getMeTheUserAndSet = async () => {
            try {
                const data = await getUser();

                if (data?.user) {
                    setUser(data.user);
                }
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }

        getMeTheUserAndSet();
    }, [])


    return (
        <AuthContext.Provider value={{user, setUser, loading, setLoading}}>
            {children}
        </AuthContext.Provider>
    )
}