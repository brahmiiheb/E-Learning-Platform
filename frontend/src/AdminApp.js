import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import AdminDashboard from './components/AdminDashboard';

const AdminApp = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/admin/*" 
          element={<AdminDashboard />}
        />
      </Routes>
    </Router>
  );
};

export default AdminApp;
