// frontend/ContactUs.js
import React from 'react';

const ContactUs = ({ onSubmit }) => {
    return (
        <div className="contact-form">
            <form onSubmit={onSubmit}>
                <h2 className="text-center">Contact Us</h2>

                <label htmlFor="name">Name</label>
                <input type="text" id="name" name="name" placeholder="Enter your name" required />

                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" placeholder="Enter your email" required />

                <label htmlFor="message">Message</label>
                <textarea id="message" name="message" placeholder="Type your message here" required></textarea>

                
                <div className="button-container">
                    <button type="submit">Send The Message</button>
                </div>
            </form>
        </div>
    );
};

export default ContactUs;
