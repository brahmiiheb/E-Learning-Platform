// src/components/AdminDashboard.js
import axios from 'axios';
import React, { useState } from 'react';
import CourseList from './CourseList';
import CourseForm from './CourseForm';
import logoImage from '../logo.PNG';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [showForm, setShowForm] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);

  const toggleForm = () => {
    setShowForm(!showForm);
    setSelectedCourse(null); // Reset selectedCourse when hiding the form
  };

  const handleCourseUpdate = (course) => {
    setSelectedCourse(course);
    setShowForm(true);
  };

  const handleCourseDelete = async (courseId) => {
    try {
      await axios.delete(`http://localhost:5000/courses/${courseId}`);
      // Refresh the course list after deletion
      // You may choose to use a more optimized approach, like updating the state without making a new request
      toggleForm();
    } catch (error) {
      console.error('Error deleting course:', error);
    }
  };

  return (
    <div className="admin-dashboard">
      <img
        className="logo"
        src={logoImage}
        alt="Logo"
      />
      <h1>Admin Dashboard</h1>
      <div className="admin-content">
        <button onClick={toggleForm}>Add Course</button>
        {showForm && <CourseForm onFormClose={toggleForm} selectedCourse={selectedCourse} />}
        <CourseList onCourseUpdate={handleCourseUpdate} onCourseDelete={handleCourseDelete} />
      </div>
    </div>
  );
};

export default AdminDashboard;
