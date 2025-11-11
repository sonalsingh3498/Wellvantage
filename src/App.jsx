import { useState } from 'react'
import './App.css'
import GoogleLoginButton from './GoogleLoginButton.jsx'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from './page/Dashboard.jsx';
import SignUpPage from './page/Signup.jsx';
import Btwob from './page/Btwob.jsx';
import LeadManagementForm from './page/LeadManagementForm.jsx';
import LeadManagementTable from './page/LeadManagementTable.jsx';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/btwob" element={<Btwob/>} /> 
        <Route path="/lead-management-form" element={<LeadManagementForm/>} />
        <Route path="/lead-management" element={<LeadManagementTable/>} />

         
      </Routes>
    </Router>
     {/* <SignUpPage/> */}
        {/* <Dashboard /> */}
      {/* <h1>Firebase Google Auth</h1>
      <GoogleLoginButton /> */}
    
    </>
  )
}

export default App
