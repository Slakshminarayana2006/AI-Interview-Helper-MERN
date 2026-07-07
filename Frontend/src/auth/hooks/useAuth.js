import { useContext } from "react";
import { AuthContext } from "../auth.context";
import {register, login, logout, getUser}from '../services/auth.api'

const useAuth = () => {
    const {user, setUser, loading, setLoading} = useContext(AuthContext);

    const handleLogin = async ({email, password}) => {
        setLoading(true);
        try {
            const data  = await login({email, password});
            setUser(data.user);
        } catch (error) {
            throw error;
        }
        finally {
            setLoading(false);
        }
    }

    const handleRegister = async ({username, email, password}) => {
        try {
            setLoading(true);
            const data = await register({username, email, password});
            console.log(data.user);
            setUser(data.user);
        } catch (error) {
            throw error;
        }
        finally{
            setLoading(false);
        }
    }

    const handleLogout = async () => {
        try {
            setLoading(true);
            const data = await logout();
            setUser(null);
            // setUser(false);
        } catch (error) {
            throw error;
        }
        finally {
            setLoading(false);
        }
    }
    return {user, setUser, loading, setLoading, handleLogin, handleLogout, handleRegister}
}

export default useAuth;