import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './store/Auth.jsx'

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'


const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(

  <QueryClientProvider client={queryClient} >
    <AuthProvider>
      <StrictMode>
        <App />
        {/* <ToastContainer /> */}
        <ToastContainer
          position="top-right"
          autoClose={1000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          draggable
          pauseOnHover
          theme="colored"
        />
      </StrictMode>
    </AuthProvider>
  </QueryClientProvider>   

)
