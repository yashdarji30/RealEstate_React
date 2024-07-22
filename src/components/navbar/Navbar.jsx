import "./navbar.scss";
import { PiBuildingsLight } from "react-icons/pi";
import { GrMenu } from "react-icons/gr";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
// import { Link } from "react-router-dom";
import noAvatar from "../../../public/noavatar.jpg";
import { useNotificationStore } from "../../lib/notifictionStore";
function Navbar() {
  const [open, setOpen] = useState(false);

  const { currentUser } = useContext(AuthContext);
  const fetch = useNotificationStore((state) => state.fetch);
  const number = useNotificationStore((state) => state.number);

  fetch();
  return (
    <nav>
      <div className="left">
        <Link to="/" className="logo">
          <PiBuildingsLight className="logoIcon" />
          <span>Real_Estate</span>
        </Link>
        <Link to="/">Home</Link>
        <Link to="/explore">Explore</Link>
        <Link to="/">Contact</Link>
        <Link to="/">Agents</Link>
      </div>
      <div className="right">
        {currentUser ? (
          <div className="user">
            <img src={currentUser.avatar || noAvatar} alt="" />
            <span>{currentUser.username}</span>
            <Link to="/profile" className="profile">
              {number > 0 && <div className="notification">{number}</div>}
              <span>Profile</span>
            </Link>
          </div>
        ) : (
          <div>
            <Link to="/login">Sign in</Link>
            <Link to="/register" className="register">
              Sign up
            </Link>
          </div>
        )}
        <div className="menuIcon">
          <GrMenu
            onClick={() => {
              setOpen((prev) => !prev);
            }}
          />
        </div>
        <div className={open ? "menu active" : "menu"}>
          <Link to="/">Home</Link>
          <Link to="/">About</Link>
          <Link to="/">Contact</Link>
          <Link to="/">Agents</Link>
          <Link to="/">Sign in</Link>
          <Link to="/">Sign up</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;