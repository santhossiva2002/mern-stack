
import axios from 'axios';
import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom"; // Import Link
import { useCookies } from "react-cookie";
import styles from './Troute.module.css';
import { ToastContainer, toast } from "react-toastify";

const Troute = () => {
    const navigate = useNavigate();
    const [cookies, removeCookie] = useCookies([]);
    const [username, setUsername] = useState("");
  
    useEffect(() => {
      const verifyCookie = async () => {
        if (!cookies.token) {
          navigate("/login");
        }
        const { data } = await axios.post(
          "http://localhost:4000",
          {},
          { withCredentials: true }
        );
        const { status, user } = data;
        setUsername(user);
        return status
          ? toast(`Hello ${user}`, {
              position: "top-right",
            })
          : (removeCookie("token"), navigate("/login"));
      };
      verifyCookie();
    }, [cookies, navigate, removeCookie]);
  
    const Logout = () => {
      removeCookie("token");
      navigate("/signup");
    };
  const [trainData, setTrainData] = useState(null);
  const [trainNumber, setTrainNumber] = useState('');
  const [hoveredIndex, setHoveredIndex] = useState(null);

  useEffect(() => {
    const fetchTrainData = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/trains/getRoute/${trainNumber}`);
        setTrainData(response.data.data); // Extracting the array from the 'data' property
      } catch (error) {
        console.error('Error fetching train data:', error);
      }
    };

    // Fetch train data when the component mounts or trainNumber changes
    if (trainNumber) {
      fetchTrainData();
    }
  }, [trainNumber]);

  return (
    <div className="main">
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
              <a href="/About">About</a>
            </li>
          </ul>
          <button className="buttons" onClick={Logout}>
            LOGOUT
          </button>
        </div>
      <hr />
      <div className={styles['formdiv']}>
        <form>
          <div className={styles['trainno']}>
            <label htmlFor="trainNumber">Train No:</label>
            <input
              type="text"
              id="trainNumber"
              name="trainNumber"
              value={trainNumber}
              onChange={(e) => setTrainNumber(e.target.value)}
            />
          </div>
        </form>
      </div>
      <hr className={styles['s2']} />
      {Array.isArray(trainData) ? (
        <section className={styles['timeline-section']}>
          <div className={styles['timeline-items']} id={styles.timelineItems}>
            {trainData.map((item, index) => (
              <div
                className={`${styles['timeline-item']} ${hoveredIndex === index ? styles['hovered'] : ''}`}
                key={index}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div className={styles['timeline-dot']}></div>
                <div className={styles['timeline-date']}></div>
                <div className={styles['timeline-content']}>
                  <h3>{item.source_stn_name}</h3>
                  <p>{item.distance} km</p>
                  {hoveredIndex === index && (
                    <>
                      <h3>Code: {item.source_stn_code}</h3>
                      <h3>Arrive: {item.arrive}</h3>
                      <h3>Depart: {item.depart}</h3>
                      <h3>Day: {item.day}</h3>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
};

export default Troute;