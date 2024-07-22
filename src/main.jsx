import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import "./index.scss"
import { SocketContextProvider } from './context/SocketContext.jsx'
import { Toaster } from "react-hot-toast";
import { AuthContextProvider } from './context/AuthContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthContextProvider>
        <SocketContextProvider>
          <Toaster />
            <App />
        </SocketContextProvider>
     </AuthContextProvider>
  </React.StrictMode>,
)
