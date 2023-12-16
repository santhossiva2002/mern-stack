import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import air from "../images/airplane-ticket.png";
import rail from "../images/train-ticket.png";
import logo from "../images/logo2.png";

const Home = () => {
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies([]);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const verifyCookie = async () => {
      if (!cookies.token) {
        navigate("/login");
        return;
      }

      try {
        const { data } = await axios.post(
          "https://backend-daahy022d-santhossiva2002s-projects.vercel.app",  // Update this URL to your backend verification endpoint
          {},
          { withCredentials: true }
        );
        const { status, user } = data;
        setUsername(user);
        if (status) {
          toast(`Hello ${user}`, {
            position: "top-right",
          });
        } else {
          removeCookie("token");
          navigate("/login");
        }
      } catch (error) {
        console.error("Error verifying cookie:", error);
      }
    };

    verifyCookie();
  }, [cookies.token, navigate, removeCookie]);

  const Logout = () => {
    removeCookie("token");
    navigate("/signup");
  };

  const startApp = () => {
    const word = document.querySelector(".word");
    const transport = document.querySelector(".transport");

    word.classList.add("move");
    transport.classList.add("move");
  };

  const showPopup = (popupId) => {
    const modalAirway = document.getElementById("popupAirway");
    const modalRailway = document.getElementById("popupRailway");

    if (popupId === "Airway") {
      modalAirway.style.display = "grid";
      modalAirway.style.justifyContent = "center";
      modalAirway.style.justifyItems = "center";
    } else if (popupId === "Railway") {
      modalRailway.style.display = "grid";
      modalRailway.style.justifyContent = "center";
      modalRailway.style.justifyItems = "center";
    }
  };

  const closePopup = () => {
    const modalAirway = document.getElementById("popupAirway");
    const modalRailway = document.getElementById("popupRailway");

    modalAirway.style.display = "none";
    modalRailway.style.display = "none";
  };

  return (
    <>
      <div className="home">
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
        <div className="content">
          <img className="logo1" src={logo} alt="" />
          <div className="word">
            <h2 className="w">Welcome TO</h2>
            <h1 className="head">AirRail Agenda</h1>
            <h2 className="q">
              “Work, Travel, Save,{" "}
              <span style={{ color: "#e20422" }}>Repeat</span>.”
            </h2>
            <button className="btn1" onClick={startApp}>
              Let's Get Started
            </button>
          </div>
          <div className="transport">
            <h2 className="select">Select the Mode Of Transport</h2>
            <div className="cards">
              <div
                className="flip-card"
                id="flip-card1"
                onClick={() => showPopup("Airway")}
              >
                <div className="flip-card-inner">
                  <div className="flip-card-front">
                    <img className="airp" src={air} alt="" />
                  </div>
                  <div className="flip-card-back">
                    <p className="title">Airway</p>
                    <p>Click to learn more</p>
                  </div>
                </div>
              </div>
              <div
                className="flip-card"
                id="flip-card2"
                onClick={() => showPopup("Railway")}
              >
                <div className="flip-card-inner">
                  <div className="flip-card-front">
                    <img className="railp" src={rail} alt="" />
                  </div>
                  <div className="flip-card-back">
                    <p className="title">Railway</p>
                    <p>Click to learn more</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="popup" id="popupAirway">
              <div className="popup-content">
                <span className="close" onClick={closePopup}>
                  &times;
                </span>
                <h2 id="popup-title">Airway</h2>
              
                  <Link to="/Aschedule">Schedule</Link><br></br><br></br>
               
                
                <Link to="/Aroute">Routes</Link>
             
              </div>
            </div>
            <div className="popup" id="popupRailway">
              <div className="popup-content">
                <span className="close" onClick={closePopup}>
                  &times;
                </span>
                <h2 id="popup-title">Railway</h2>
                <Link to="/schedule">Schedule</Link><br></br><br></br>
                <Link to="/Troute">Routes</Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ToastContainer />
    </>
  );
};

export default Home;
