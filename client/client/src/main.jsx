import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client';
import { AuthProvider } from "./services/authService.jsx";
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
    < AuthProvider>
     <App /> 
     </AuthProvider>
)
