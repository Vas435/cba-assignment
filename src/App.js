import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Components
import Login from "./JS/login"; 
import Registration from "./JS/registration"; 
import EmployeeList from "./components/EmployeeList";
import EmployeeForm from "./components/EmployeeForm";
import EmployeeView from "./components/EmployeeView";

function App() {
  return (
    <BrowserRouter>
      {/* We removed the <nav> links here because usually, 
         you don't see navigation links on a Login page.
      */}
      
      <Routes>
        {/* Default Route: Redirect to Login */}
        <Route path="/" element={<Navigate to="/login" />} />
        
        {/* Auth Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
        
        {/* App Routes (The Dashboard) */}
        <Route path="/employees" element={<EmployeeList />} />
        <Route path="/add-employee" element={<EmployeeForm />} />
        <Route path="/edit-employee/:id" element={<EmployeeForm />} />
        <Route path="/view-employee/:id" element={<EmployeeView />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;