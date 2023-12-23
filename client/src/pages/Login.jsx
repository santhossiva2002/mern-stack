import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
  });
  const { email, password } = inputValue;
  const [showAdminPrompt, setShowAdminPrompt] = useState(false);
  const [adminPromptValue, setAdminPromptValue] = useState("");

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const handleError = (err) =>
    toast.error(err, {
      position: "bottom-left",
    });
  const handleSuccess = (msg) =>
    toast.success(msg, {
      position: "bottom-left",
    });

  const handleAdminPromptClick = () => {
    setShowAdminPrompt(true);
  };

  const handleAdminPromptSubmit = () => {
    if (adminPromptValue.toLowerCase() === "i'm an admin") {
      setShowAdminPrompt(false);
      // Redirect to the admin login page
      navigate("/AdminLogin");
    } else {
      handleError("Incorrect input. Please try again.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "https://server-qm6q.onrender.com/login",
        {
          ...inputValue,
        },
        { withCredentials: true }
      );
      console.log(data);
      const { success, message } = data;
      if (success) {
        handleSuccess(message);
        setTimeout(() => {
          navigate("/");
        }, 1000);
      } else {
        handleError(message);
      }
    } catch (error) {
      console.log(error);
    }
    setInputValue({
      ...inputValue,
      email: "",
      password: "",
    });
  };

  return (
    <div className="form_container">
      {/* Admin prompt button */}
      <button className="admin-prompt-button" onClick={handleAdminPromptClick}>
        ?
      </button>

      {/* Admin prompt modal */}
      {showAdminPrompt && (
        <div className="admin-prompt-modal">
          <p>what do you want:</p>
          <input
            type="text"
            value={adminPromptValue}
            onChange={(e) => setAdminPromptValue(e.target.value)}
          />
          <button onClick={handleAdminPromptSubmit}>Submit</button>
        </div>
      )}

      <h2>Login Account</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            value={email}
            placeholder="Enter your email"
            onChange={handleOnChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={password}
            placeholder="Enter your password"
            onChange={handleOnChange}
          />
        </div>
        <button type="submit">Submit</button>
        <span className="sl">
          Don't have an account{" "}
          <Link className="sl" to={"/signup"}>
            Signup
          </Link>
        </span>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Login;
