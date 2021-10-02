import React from "react";
import { NavLink } from "react-router-dom";
import { authServices } from "../services/auth";
import { connect } from "react-redux";
import "../Styles/Navbar.component.css";

const Navbar = (props) => {
  const { isAuth, role } = props;

  return (
    <nav className="navbar">
      <ul className="navbar-nav">
        <li className="logo">
          <NavLink to="/" className="nav-link">
            <span className="link-text logo-text">Watch It out</span>
            <svg
              aria-hidden="true"
              focusable="false"
              data-prefix="fad"
              data-icon="angle-double-right"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
              className="svg-inline--fa fa-angle-double-right fa-w-14 fa-5x"
            >
              <g className="fa-group">
                <path
                  fill="currentColor"
                  d="M224 273L88.37 409a23.78 23.78 0 0 1-33.8 0L32 386.36a23.94 23.94 0 0 1 0-33.89l96.13-96.37L32 159.73a23.94 23.94 0 0 1 0-33.89l22.44-22.79a23.78 23.78 0 0 1 33.8 0L223.88 239a23.94 23.94 0 0 1 .1 34z"
                  className="fa-secondary"
                ></path>
                <path
                  fill="currentColor"
                  d="M415.89 273L280.34 409a23.77 23.77 0 0 1-33.79 0L224 386.26a23.94 23.94 0 0 1 0-33.89L320.11 256l-96-96.47a23.94 23.94 0 0 1 0-33.89l22.52-22.59a23.77 23.77 0 0 1 33.79 0L416 239a24 24 0 0 1-.11 34z"
                  className="fa-primary"
                ></path>
              </g>
            </svg>
          </NavLink>
        </li>

        <li className="nav-item">
          <NavLink to="/" className="nav-link">
            <i className="fa fa-home"></i>
            <span className="link-text">Home</span>
          </NavLink>
        </li>

        <li className="nav-item">
          <NavLink to="/video" className="nav-link">
            <i className="fa fa-video-camera"></i>
            <span className="link-text">Video</span>
          </NavLink>
        </li>

        {role === "admin" ? (
          <li className="nav-item">
            <NavLink to="/admin" className="nav-link">
              <i className="fa fa-database"></i>
              <span className="link-text">Admin panel</span>
            </NavLink>
          </li>
        ) : (
          isAuth === true && (
            <>
              <li className="nav-item">
                <NavLink to="/dashboard" className="nav-link">
                  <i className="fa fa-user"></i>
                  <span className="link-text">Dashboard</span>
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink to="/cart" className="nav-link">
                  <i className="fa fa-shopping-cart"></i>
                  <span className="link-text">Cart</span>
                </NavLink>
              </li>
            </>
          )
        )}

        <li className="nav-item">
          {isAuth ? (
            <div className="nav-link" onClick={authServices.logout}>
              <i className="fa fa-power-off"></i>
              <span className="link-text">logout</span>
            </div>
          ) : (
            <NavLink to="/login" className="nav-link">
              <i className="fa fa-sign-in"></i>
              <span className="link-text">Register/SignIn</span>
            </NavLink>
          )}
        </li>
      </ul>
    </nav>
  );
};

const mapStateToProps = (state) => {
  return state.auth;
};

export default connect(mapStateToProps, {})(Navbar);
