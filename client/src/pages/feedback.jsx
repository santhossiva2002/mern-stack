import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './feedback.module.css';

const Feedback = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    feedback: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:4000/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log('Feedback submitted successfully');
        // Clear the form data
        setFormData({
          name: '',
          email: '',
          feedback: '',
        });

        // Show success toast
        toast.success('Feedback submitted successfully', {
          position: 'top-right',
          autoClose: 5000, // 3 seconds
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
        });
      } else {
        const errorData = await response.json();
        console.error('Error submitting feedback:', errorData);
        // Handle error, e.g., show an error message
      }
    } catch (error) {
      console.error('Error submitting feedback:', error.message);
      // Handle error, e.g., show an error message
    }
  };

  return (
    <div className="main">
      <div className="nav">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/Weather">weather</Link>
          </li>
          <li>
            <a href="/feedback">Feedback</a>
          </li>
          <li>
            <a href="#contact">Contact</a>
          </li>
          <li>
            <a href="/About">About</a>
          </li>
        </ul>
        <button className="buttons">LOGOUT</button>
      </div>
      <div className={styles.container}>
        <h2 className={styles.h2}>Feedback Form</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label htmlFor="feedback">Feedback:</label>
          <textarea
            id="feedback"
            name="feedback"
            rows="4"
            value={formData.feedback}
            onChange={handleChange}
            required
          ></textarea>

          <button type="submit" className={styles.feedsubmit}>
            Submit Feedback
          </button>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};

export default Feedback;
