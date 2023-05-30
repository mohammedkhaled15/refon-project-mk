import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes,Route } from 'react-router-dom'
import App from './App.jsx'
import './styles/index.scss' 
import { LoginAuthProvider } from './context/authContext'

ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
    <LoginAuthProvider>
      <Routes>
        <Route path='/*' element={<App />} />
      </Routes>
    </LoginAuthProvider>
  </BrowserRouter>
)
