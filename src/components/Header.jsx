import React from "react";
import { Link } from "react-router-dom";
import "../style/HeaderStyle.css";
import { useAuth } from "../authentication/AuthCustome";
import { Fragment } from "react";

const Header = ({ center, emailUser, title }) => {

  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  const renderLogout = () => {
    return(
      <Fragment>
        <div className="welcome-title"> Welcom user - {emailUser}</div>
        <button className="welcome-title btn btn-danger" onClick={() => {handleLogout()}}>Logout</button>
      </Fragment>
    );
  };

  return (
    <div className={`header ${center}`}>
      <Link to={emailUser ? `/product_frontend` : '/'} className="mb-5 mt-2 display-6 text-dark" style={{textDecoration: "none"}}>
        {title}
      </Link>
      <div className="welcome-container d-flex align-items-center">
        {emailUser && renderLogout()}
      </div>
      
      
    </div>
  );
};

export default Header;
