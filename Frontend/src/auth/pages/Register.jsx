import React, { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router'
import useAuth from '../hooks/useAuth';

function Register() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({
        username : "",
        password : "",
        email : ""
    })

    
    const {loading, handleRegister} = useAuth();
    
    const navigate = useNavigate();
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const newError = {
                email : "",
                password : "",
                username : ""
            }
            if(password.length < 6) {
                newError.password = 'Password atleast contains 6 characters';
            }
        
            if(!username.trim()) {
                newError.username = 'username is required';
            }

            if(!email.trim()) {
                newError.email = 'email is required';
            }
            
            setErrors(newError);

            if(newError.username || newError.password || newError.email) {
                return;
            }
            await handleRegister({username, email, password});
            alert("Account created successfully");
            navigate('/login');
        } catch (error) {
            const {field, message} = error.response.data;
            setErrors((prev) => ({
                ...prev,
                [field] : message
            }))
        }
        
    }

  return (
    <>
        <div className="register min-h-screen w-full flex justify-center items-center bg-[#181817] px-4">
            <div className="center w-full max-w-sm bg-[#232321] border border-yellow-500/30 rounded-2xl shadow-2xl p-8">
                <div className="mb-8 text-center">
                    <h1 className=' text-3xl font-bold text-yellow-400'>Welcome</h1>
                    <p className='text-gray-400 mt-2 text-sm'>Create your AI Interview Helper account</p>
                </div>
                <form onSubmit={handleSubmit} className='space-y-8'>
                    <div>
                        <label htmlFor="username" className='block text-sm mb-2 text-yellow-300'>Username</label>
                        <div className="username relative">
                            <input id='username' name='username' value={username} onChange={
                                (e) => {
                                    setUsername(e.target.value);
                                    setErrors(prev => ({
                                        ...prev,
                                        username : ""
                                    }))
                                }
                            } placeholder='Enter your username' type="text" className='w-full px-4 py-3 rounded-xl bg-[#181817] border border-gray-700 text-white placeholder-gray-500 outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition' />
                            {
                                errors.username && (
                                    <p className="absolute top-full left-0 text-red-400 text-sm mt-1 min-h-5">{errors.username}</p>
                                )
                            }
                        </div>
                        
                    </div>
                    <div className="email">
                        <label htmlFor="email" className='block text-sm mb-2 text-yellow-300'>Email</label>
                        <div className="email relative">
                            <input id='email' name = "email" value={email} onChange={
                                (e) => {
                                    setEmail(e.target.value);
                                    setErrors(prev => ({
                                        ...prev,
                                        email : ""
                                    }))
                                }
                            } placeholder="Enter your email" type="email" className='w-full px-4 py-3 rounded-xl bg-[#181817] border border-gray-700 text-white placeholder-gray-500 outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition' />
                            {
                                errors.email && (
                                    <p className="absolute top-full left-0 text-red-400 text-sm mt-1 min-h-5">{errors.email}</p>
                                )
                            }
                        </div> 
                        
                    </div>
                    <div className="pass">
                        <label htmlFor="password"  className='block text-sm mb-2 text-yellow-300'>Password</label>
                        <div className="password relative">
                            <input id='password' name = "password" value={password} onChange=
                            {
                                (e) => {
                                    setPassword(e.target.value);
                                    setErrors(prev => ({
                                        ...prev,
                                        password : ""
                                    }))
                                }

                            } placeholder="Enter your password" type="password" className='w-full px-4 py-3 rounded-xl bg-[#181817] border border-gray-700 text-white placeholder-gray-500 outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition' />
                            {
                                errors.password && (
                                    <p className=" absolute left-0 top-full text-red-400 text-sm mt-1 min-h-5">{errors.password}</p>
                                )
                            }
                        </div>
                    </div>
                    <button className = {`w-full bg-yellow-400 hover:bg-yellow-300 text-black font-semibold py-3 rounded-xl transition duration-300 shadow-lg shadow-yellow-500/20 cursor-pointer ${loading ? "bg-yellow-300 cursor-not-allowed": "bg-yellow-400 hover:bg-yellow-300 cursor-pointer"}`}  disabled={loading} >{
                        loading ? 'Creating Account...' : "Register"
                    }</button>
                </form>
                <div className="already already mt-6 text-center text-sm">
                    <span className='text-gray-400'>Already Registered ? </span>
                    <Link to="/login" className='ml-2 text-yellow-400 hover:text-yellow-300 font-medium'>Login</Link>
                </div>
            </div>
        </div>
    </>
  )
}

export default Register