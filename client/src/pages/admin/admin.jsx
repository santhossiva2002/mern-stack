import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import styles from './admin.module.css'; // Replace with the actual CSS file name

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome,
  faUser,
  faPlane,
  faComments,
  faSignOutAlt,
} from '@fortawesome/free-solid-svg-icons';

const Admin = () => {
  const [counts, setCounts] = useState({
    userCount: 0,
    airplaneCount: 0,
    feedbackCount: 0, // Added feedback count state
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseUser = await fetch('http://localhost:4000/get/getCountUser');
        const dataUser = await responseUser.json();

        const responseCount = await fetch('http://localhost:4000/api/getCount');
        const dataCount = await responseCount.json();

        const responseFeedback = await fetch('http://localhost:4000/countFeedback');
        const dataFeedback = await responseFeedback.json();

        setCounts({
          userCount: dataUser.count,
          airplaneCount: dataCount.count,
          feedbackCount: dataFeedback.count, // Set feedback count
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

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
          <i className={`fas ${styles.faHome}`}></i> Home
        </h2>
      </div>
  
      <div className={styles.card}>
        <>
          <h3>
            <i className={`fas ${styles.faUsers}`}></i> User Count: {counts.userCount}
          </h3>
          <h3>
            <i className={`fas ${styles.faPlane}`}></i> Airplane Count: {counts.airplaneCount}
          </h3>
          <h3>
            <i className={`fas ${styles.faComments}`}></i> Feedback Count: {counts.feedbackCount}
          </h3>
        </>
      </div>
    </div>
  );
};

export default Admin;
