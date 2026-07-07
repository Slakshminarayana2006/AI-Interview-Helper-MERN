import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router';
import Login from './auth/pages/Login';
import Register from './auth/pages/Register';
import Home from './ai/pages/Home'
import Protected from './auth/components/Protected';
import Analyze from './ai/pages/Analyze';
import History from './ai/pages/History';

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element = {<Protected><Home /></Protected>} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/analyze' element={<Protected><Analyze /></Protected>} />
        <Route path='/history' element = {<Protected><History /></Protected>} />
      </Routes>
    </>
  )
}

export default App;
