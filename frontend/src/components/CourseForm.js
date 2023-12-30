import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CourseForm.css';
const CourseForm = ({ onFormClose, selectedCourse }) => {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [file, setFile] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    if (selectedCourse) {
      setTitle(selectedCourse.title);
      setPrice(selectedCourse.price);
      setImage(selectedCourse.image);
      setIsUpdating(true);
    }
  }, [selectedCourse]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setImage(selectedFile ? URL.createObjectURL(selectedFile) : '');
  };

  const getBase64Image = async (imageUrl) => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        const reader = new FileReader();
        reader.onloadend = function () {
          resolve(reader.result);
        };
        reader.readAsDataURL(xhr.response);
      };
      xhr.onerror = function (error) {
        reject(error);
      };
      xhr.open('GET', imageUrl);
      xhr.responseType = 'blob';
      xhr.send();
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const base64Image = file ? await getBase64Image(URL.createObjectURL(file)) : '';

      const formData = new FormData();
      formData.append('title', title);
      formData.append('price', price);
      formData.append('image', file);

      if (isUpdating) {
        const updatedCourseData = { title, price };

        if (base64Image) {
          // Handle blob URL (upload the image and get the server's response)
          const imageFormData = new FormData();
          imageFormData.append('image', file);

          const response = await axios.post('http://localhost:5000/upload', imageFormData); // Adjust the endpoint
          updatedCourseData.image = response.data.filename;
        } else {
          // Use the existing image URL
          updatedCourseData.image = image;
        }

        await axios.put(`http://localhost:5000/courses/${selectedCourse._id}`, updatedCourseData);
      } else {
        await axios.post('http://localhost:5000/courses', formData);
      }

      // Refresh the course list after submission
      onFormClose();
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className="course-form">
      <h2>{isUpdating ? 'Update Course' : 'Create Course'}</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <label>
          Title:
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </label>
        <label>
          Price:
          <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} required />
        </label>
        <label>
          Image:
          <input type="file" accept="image/*" onChange={handleFileChange} />
          {image && <img src={image} alt="Course Preview" style={{ maxWidth: '100px', maxHeight: '100px' }} />}
        </label>
        <button type="submit">{isUpdating ? 'Update' : 'Create'}</button>
        <button type="button" onClick={onFormClose}>Cancel</button>
      </form>
    </div>
  );
};

export default CourseForm;
