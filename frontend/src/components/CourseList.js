// src/components/CourseList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CourseList.css';

const CourseList = ({ onCourseUpdate, onCourseDelete }) => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    // Fetch courses from the backend when the component mounts
    const fetchCourses = async () => {
      try {
        const response = await axios.get('http://localhost:5000/courses');
        setCourses(response.data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses();
  }, []); // The empty dependency array ensures that this effect runs once when the component mounts

  return (
    <div className="course-list">
      <h2>Course List</h2>
      <table>
        <thead>
          <tr>
            <th>Image</th>
            <th>Title</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course) => (
            <tr key={course._id}>
              <td>
              <img
                src={`http://localhost:5000/assets/${course.image || 'default-image.jpg'}`}
                alt={course.title}
                style={{ maxWidth: '100px', maxHeight: '100px' }}
                />
              </td>
              <td>{course.title}</td>
              <td>{course.price}</td>
              <td>
                <button onClick={() => onCourseUpdate(course)}>Update</button>
                <button onClick={() => onCourseDelete(course._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CourseList;
