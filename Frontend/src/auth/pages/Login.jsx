import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import useAuth from '../hooks/useAuth'

function Login() {
  const {loading, setUser, handleLogin} = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState({
      password : "",
      email : ""
  })
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newError = {
                  email : "",
                  password : ""
      }
      if(password.length < 6) {
          newError.password = 'Password atleast contains 6 characters';
      }
          
  
      if(!email.trim()) {
          newError.email = 'email is required';
      }
              
      setErrors(newError);
  
      if(newError.password || newError.email) {
          return;
      }
      await handleLogin({email, password});
      alert("Logined Successfully");
      navigate('/');   
    } catch (error) {
      const {field, message} = error.response.data;
      setErrors((prev) => ({
          ...prev,
          [field] : message
      }))
    }
  }

  // if(loading) {
  //   return(<main>Loading</main>)
  // }

  return (
    <>
        <div className="login min-h-screen w-full flex justify-center items-center bg-[#181817] px-4">
          <div className = "w-full max-w-sm bg-[#232321] border border-yellow-500/30 rounded-2xl shadow-2xl p-8">
            <div className="mb-8 text-center">
              <h1 className="text-3xl font-bold text-yellow-400">Welcome Back</h1>
              <p className="text-gray-400 mt-2 text-sm">Login to your AI Interview Helper</p>
            </div>
            <form onSubmit={handleSubmit} className='space-y-8'>
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
              <button className='w-full bg-yellow-400 hover:bg-yellow-300 text-black font-semibold py-3 rounded-xl transition duration-300 shadow-lg shadow-yellow-500/20 cursor-pointer' disabled={loading}>{loading ? "Loggin in...." : "Login"}</button>
            </form>
            <div className="already mt-6 text-center text-sm">
              <span className=' text-gray-400'>Don’t have an account?</span>
              <Link to="/register" className='ml-2 text-yellow-400 hover:text-yellow-300 font-medium'>Register</Link>
            </div>
          </div>
        </div>
    </>
  )
}

export default Login