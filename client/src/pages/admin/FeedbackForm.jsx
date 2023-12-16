import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import styles from './admin.module.css'; // Replace with the actual CSS file name

const FeedbackForm = () => {
  const [feedbackData, setFeedbackData] = useState([]);
  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(() => {
    // Fetch feedback data when the component mounts
    fetchFeedbackData();
  }, []);

  const fetchFeedbackData = async () => {
    try {
      const response = await fetch('http://localhost:4000/getFeedback');
      if (response.ok) {
        const data = await response.json();
        setFeedbackData(data);
      } else {
        console.error('Error fetching feedback data');
      }
    } catch (error) {
      console.error('Error fetching feedback data:', error.message);
    }
  };

  const handleDoneClick = async (email) => {
    try {
      const response = await fetch(`http://localhost:4000/deleteFeedback/${email}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setSuccessMessage({ message: 'Feedback marked as done successfully', email });
        fetchFeedbackData(); // Refresh feedback data after deletion
      } else {
        console.error('Error marking feedback as done');
      }
    } catch (error) {
      console.error('Error marking feedback as done:', error.message);
    }
  };

  useEffect(() => {
    if (successMessage) {
      // Check if the current user's email matches the feedback email
      const currentUserEmail = '123@gmail.com'; // Replace with your logic to get the user's email
      if (currentUserEmail === successMessage.email) {
        toast.success(successMessage.message);
        setSuccessMessage(null); // Reset the success message after displaying the toast
      }
    }
  }, [successMessage]);

  return (
    <div className={styles.container}>
       <div className={styles.nav}>
        <ul>
          <li>
            <Link to="/Admin">
              <i className={`fas ${styles.faHome}`}></i> Home
            </Link>
          </li>
          <li>
            <Link to="/userProfile">
              <i className={`fas ${styles.faUser}`}></i> User Profile
            </Link>
          </li>
          <li>
            <Link to="/airSch">
              <i className={`fas ${styles.faPlane}`}></i> Schedule
            </Link>
          </li>
          <li>
            <Link to="/FeedbackForm">
              <i className={`fas ${styles.faComments}`}></i> Feedback
            </Link>
          </li>
          <li>
            <Link to="/AdminLogin">
              <i className={`fas ${styles.faSignOutAlt}`}></i> Logout
            </Link>
          </li>
        </ul>
      </div>
      <div className={styles.card}>
        <h2>
          <i className={`fas ${styles.faHome}`}></i> Users Feedbacks
        </h2>
      </div>

      <div className={styles.card}>
        {/* Display feedback data in a table */}
        <table className={styles.feedbackTable}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Feedback</th>
              <th>Created At</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {feedbackData.map((feedback) => (
              <tr key={feedback._id}>
                <td>{feedback.name}</td>
                <td>{feedback.email}</td>
                <td>{feedback.feedback}</td>
                <td>{new Date(feedback.createdAt).toLocaleString()}</td>
                <td>
                  <button onClick={() => handleDoneClick(feedback.email)}>
                    Done
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FeedbackForm;