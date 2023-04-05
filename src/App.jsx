import { Routes, Route } from "react-router-dom";
import "./css/Main.css";
import "./css/Profile.css";
import "./css/EditProfile.css";

// Compontent imports:
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Users from "./components/Users";
import UserProfile from "./components/UserProfile";
import AddDog from "./components/AddDog";
import EditUserProfile from "./components/EditUserProfile";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<Users />} />
        <Route path="/UserProfile/:id" element={<UserProfile />} />
        <Route path="/addDog" element={<AddDog />} />
        <Route path="/editUserProfile/:id" element={<EditUserProfile />} />
      </Routes>
    </div>
  );
}

export default App;
