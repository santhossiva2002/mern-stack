import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom"; // Import Link
import { useCookies } from "react-cookie";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import styles from './weather.module.css';

const Weather = () => {
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
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await fetch(`http://localhost:4000/weather/${city}`);
        if (!response.ok) {
          throw new Error('Failed to fetch weather data');
        }

        const data = await response.json();
        setWeatherData(data);
        setError('');
      } catch (error) {
        setWeatherData(null);
        setError('Error fetching weather data. Please try again.');
      }
    };

    if (city) {
      fetchWeatherData();
    }
  }, [city]);

  const handleInputChange = (event) => {
    setCity(event.target.value);
  };

  return (
    <div className={styles.main}>
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
      <div className={styles.container}>
        <form>
          <label htmlFor="cityInput">Enter City:</label>
          <input
            type="text"
            id="cityInput"
            value={city}
            onChange={handleInputChange}
            placeholder="E.g., New York"
          />
        </form>

        {error && <div className={styles.errorMessage}>{error}</div>}

        {weatherData && (
          <div className={styles.weatherInfo}>
            <div className={styles.weatherInfoItem}>
              <span className={styles.weatherInfoLabel}>Cloud Percentage:</span>
              <span className={styles.weatherInfoValue}>{weatherData.cloud_pct}%</span>
            </div>
            <div className={styles.weatherInfoItem}>
              <span className={styles.weatherInfoLabel}>Temperature:</span>
              <span className={styles.weatherInfoValue}>{weatherData.temp}°C</span>
            </div>
            <div className={styles.weatherInfoItem}>
              <span className={styles.weatherInfoLabel}>Feels Like:</span>
              <span className={styles.weatherInfoValue}>{weatherData.feels_like}°C</span>
            </div>
            <div className={styles.weatherInfoItem}>
              <span className={styles.weatherInfoLabel}>Humidity:</span>
              <span className={styles.weatherInfoValue}>{weatherData.humidity}°C</span>
            </div>
            <div className={styles.weatherInfoItem}>
              <span className={styles.weatherInfoLabel}>Min Temp:</span>
              <span className={styles.weatherInfoValue}>{weatherData.min_temp}°C</span>
            </div>
            <div className={styles.weatherInfoItem}>
              <span className={styles.weatherInfoLabel}>Max Temp:</span>
              <span className={styles.weatherInfoValue}>{weatherData.max_temp}°C</span>
            </div>
            <div className={styles.weatherInfoItem}>
              <span className={styles.weatherInfoLabel}>Wind Speed:</span>
              <span className={styles.weatherInfoValue}>{weatherData.wind_speed}°C</span>
            </div>
            <div className={styles.weatherInfoItem}>
              <span className={styles.weatherInfoLabel}>Wind Degrees:</span>
              <span className={styles.weatherInfoValue}>{weatherData.wind_degrees}°C</span>
            </div>
            <div className={styles.weatherInfoItem}>
              <span className={styles.weatherInfoLabel}>Sunrise:</span>
              <span className={styles.weatherInfoValue}>{weatherData.sunrise}°C</span>
            </div>
            <div className={styles.weatherInfoItem}>
              <span className={styles.weatherInfoLabel}>Sunset:</span>
              <span className={styles.weatherInfoValue}>{weatherData.sunset}°C</span>
            </div>
            {/* Add more items for other weather data */}
          </div>
        )}
    </div>
    </div>
);
      };


export default Weather;
