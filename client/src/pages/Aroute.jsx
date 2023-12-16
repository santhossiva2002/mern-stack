
import axios from 'axios';
import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom"; // Import Link
import { useCookies } from "react-cookie";
import styles from './Troute.module.css';
import { ToastContainer, toast } from "react-toastify";


const Aroute = () => {
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
  const [userFlightNumber, setuserFlightNumber] = useState('');
  const [hoveredIndex, setHoveredIndex] = useState(null);

  useEffect(() => {
    const fetchTrainData = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/airways/${userFlightNumber}`);
        console.log('Response data:', response.data);
  
        if (Array.isArray(response.data)) {
          // If the response is an array, set it directly
          setTrainData(response.data);
        } else if (typeof response.data === 'object') {
          // If the response is an object, convert it to an array and set
          setTrainData([response.data]);
        } else {
          // Handle other cases or unexpected formats
          setTrainData(null);
        }
      } catch (error) {
        console.error('Error fetching train data:', error);
        setTrainData(null);
      }
    };
  
    // Fetch train data when the component mounts or userFlightNumber changes
    if (userFlightNumber) {
      fetchTrainData();
    }
  }, [userFlightNumber]);
  

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
            <label htmlFor="userFlightNumber">Flight Number:</label>
            <input
              type="text"
              id="userFlightNumber"
              name="userFlightNumber"
              value={userFlightNumber}
              onChange={(e) => setuserFlightNumber(e.target.value)}
            />
          </div>
        </form>
      </div>
      <hr className={styles['s2']} />
      {Array.isArray(trainData) && trainData.length > 0 ? (
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
                  <h3>{item.FlightName}</h3>
                  <p>{item.Stop} </p>
                  {hoveredIndex === index && (
                    <>
                      <h3>Flight Number: {item.FlightNumber}</h3>
                      <h3>Arrival: {item.Arrival}</h3>
                      <h3>Departure: {item.Departure}</h3>
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

export default Aroute;
