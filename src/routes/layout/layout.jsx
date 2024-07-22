import { Navigate, Outlet } from "react-router-dom";
import "./layout.scss";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import  Navbar  from "../../components/Navbar/Navbar.jsx";

function Layout() {
  return (
    <div className="layout">
      <div className="navbar">
        <Navbar />
      </div>
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
}

function RequireAuth() {
  const { currentUser } = useContext(AuthContext);
  console.log(currentUser);
  if (currentUser === null) return <Navigate to="/login" />;
  else {
    return (
      <div className="layout">
        <div className="navbar">
          <Navbar />
        </div>
        <div className="content">
          <Outlet />
        </div>
      </div>
    );
  }
}

export { Layout, RequireAuth };
