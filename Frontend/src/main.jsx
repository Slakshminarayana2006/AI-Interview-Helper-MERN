import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router'
import { AuthProvider } from './auth/auth.context';
import {AiProvider } from './ai/AiContext.jsx'


createRoot(document.getElementById('root')).render(
  <AiProvider>
    <AuthProvider>
    <BrowserRouter>
      <StrictMode>
        <App />
      </StrictMode>,
    </BrowserRouter>
  </AuthProvider>
  </AiProvider>
  
)
