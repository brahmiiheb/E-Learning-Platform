// frontend/LandingPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ContactUs from './ContactUs';
import './styles.css';
import logoImage from './logo.PNG';

const LandingPage = () => {
    const [courses, setCourses] = useState([]);
    const [message, setMessage] = useState('');
    const [contactForm, setContactForm] = useState({
        name: '',
        email: '',
        message: ''
    });

    useEffect(() => {
        fetchCourses();
    }, []);

    const fetchCourses = async () => {
        const result = await axios.get('http://localhost:5000/courses');
        setCourses(result.data);
    };

    const register = async () => {
        await axios.post('http://localhost:5000/register', { message });
        setMessage('');
    };

    const handleContactChange = (e) => {
        const { name, value } = e.target;
        setContactForm(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleContactSubmit = (e) => {
        e.preventDefault();
        // Add logic to handle the submission of the contact form
        console.log('Contact form submitted:', contactForm);
        // You can send the contact form data to your backend here
    };

    const handleViewMoreClick = () => {
        // Add logic to handle the "View More" button click
        console.log('View More clicked');
    };

    return (
        <div className="container-fluid h-80">
           {/*   Title Section 
            <div className="row text-black py-5">
                <div>
                    <h1>The Bridge</h1>
                </div>
            </div>*/}
                    <div className="row text-center py-5">
            <div className="col-2"> 
                <img src={logoImage} alt="The Bridge Logo" className="img-fluid" />
            </div>
        </div>
    
            {/* Improve Skills Section */}
            <div className="row bg-light text-black py-5 improve-skills-section">
                <div className="col-md-8 offset-md-2 transparent-container text-center">
                    <h3>Improve your skills on your own <br /> To prepare for a better future</h3>
                    <button className="btn btn-primary" onClick={register}>REGISTER NOW</button>
                </div>
            </div>
    
            {/* Discover Courses Section */}
            <div className="row bg-light py-5">
            <div className="col text-center ml-4">
    <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="mb-0" style={{ marginInlineEnd: "auto" }}>Discover our courses</h2>
        <button className="btn btn-primary ml-auto" onClick={handleViewMoreClick}>View More</button>
    </div>
                    <div className="row">
                        {courses.map(course => (
                            <div key={course.id} className="col-md-4 mb-4">
                                <img src={`http://localhost:5000/assets/${course.image || 'default-image.jpg'}`} alt={course.title} className="img-fluid mb-2 course-image " />
                                <p className="course-title">{course.title}</p>
                                <p className="course-price">{course.price}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
    
            {/* Contact Us Section */}
            <div className="row bg-light py-4">
                <div className="col-md-8 offset-md-2 contact-container">
                    <ContactUs onSubmit={handleContactSubmit} />
                </div>
            </div>
        </div>
    );
    
};

export default LandingPage;
