import { Route, Routes } from "react-router-dom";
import { Login, Signup } from "./pages";
import Home from "./pages/Home";
import Schedule from "./pages/schedule";
import ASchedule from "./pages/Aschedule";
import Weather from "./pages/weather";
import Admin from "./pages/admin/admin";
import AdminLogin from "./pages/admin/adminLogin";
import Feedback from "./pages/feedback";
import AirSch from "./pages/admin/airSch"; // Correct casing and file extension
import UserProfile from "./pages/admin/UserProfile"; // Correct casing and file extension
import FeedbackForm from "./pages/admin/FeedbackForm";
import Troute from "./pages/Troute";
import Aroute from "./pages/Aroute";
import About from "./pages/about";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="https://server-qm6q.onrender.com/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/schedule" element={<Schedule />} /> 
        <Route path="/Aschedule" element={<ASchedule />} />
        <Route path="/Weather" element={<Weather />} />
        <Route path="/Admin" element={<Admin />} />
        <Route path="/AdminLogin" element={<AdminLogin />} />
        <Route path="/userProfile" element={<UserProfile />} />
        <Route path="/airSch" element={<AirSch />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/FeedbackForm" element={<FeedbackForm />} />
        <Route path="/Troute" element={<Troute />} />
        <Route path="/Aroute" element={<Aroute />} />
        <Route path="/About" element={<About />} />
        
      </Routes>
    </div>
  );
}

export default App;
