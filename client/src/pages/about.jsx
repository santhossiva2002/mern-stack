import React from 'react';
import { Link } from 'react-router-dom';
import styles from'./about.module.css'; // Import the CSS file (replace with the actual file name)
import goutham from "../images/goutham.jpg";
import naresh from "../images/naresh.jpg";
import siva from "../images/siva.jpg";
const About = () => {
  const logout = () => {
    // Add your logout functionality here
    alert('Logged out!'); // Example: You can replace this with your logout logic
  };

  return (
    <>
      <header>
    

        {/* Interactive Navigation Bar */}
        <div className="nav">
          <ul>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
            <Link to="/Weather">Weather</Link>

            </li>
            <li>
              <a href="/feedback">Feedback</a>
            </li>
            <li>
              <a href="#contact">Contact</a>
            </li>
            <li>
              <a href="#about">About</a>
            </li>
          </ul>
          <button className="buttons" >Logout
          </button>
        </div>
       
        {/* Logout Button (Moved to the top right corner) */}
       
      </header>
      <hr className={styles.divider} />

      <div className={styles.main}>
        <section className={styles.description}>
          <b>
            <h2>About</h2>
          </b>
          <p>
            This innovative application revolutionizes the management of schedules and routes for both airway and railway services, offering users a seamless and efficient platform for overseeing transportation operations. With a user-friendly interface, the application optimizes time consumption by eliminating the need for users to input extensive data, providing a quick and accessible overview of schedules and routes. The system prioritizes passenger convenience by keeping them informed with real-time updates and alert messages, ensuring they stay abreast of critical information such as adverse weather conditions, delays, or emergencies. By enhancing scheduling precision and communication, this application sets a new standard for the streamlined and reliable management of transportation systems, ultimately contributing to the overall efficiency and safety of airway and railway services.
          </p>
        </section>

        <section className={styles.team}>
          <h2 className={styles.h2}>Team Members</h2>
          <div className={styles.team_member}>
            <img src={goutham} className={styles.team_member_image} alt="Goutham H" />
            <strong>Goutham H</strong>
            {/* Additional information about the team member if needed */}
          </div>
          <div className={styles.team_member}>
            <img src={naresh} alt="Naresh Kumar P" className={styles.team_member_image} />
            <strong>Naresh Kumar P</strong>
            {/* Additional information about the team member if needed */}
          </div>
          <div className={styles.team_member}>
            <img src={siva} alt="Siva Poopathi M" className={styles.team_member_image} />
            <strong>Siva Poopathi M</strong>
            {/* Additional information about the team member if needed */}
          </div>
        </section>
      </div>

      <footer>
        <p>&copy; 2023 AirRail Agenda. All rights reserved.</p>
      </footer>
     
    </>
    
  );
};

export default About;