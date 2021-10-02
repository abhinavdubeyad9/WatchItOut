import React, { useState } from "react";
// import { Container, TextField, Button } from '@mui/material';
import "../Styles/Signup.component.css";
import { authServices } from "../services/auth";

const intialState = {
  name: "",
  email: "",
  phone: "",
  role: "",
  password: "",
};

const PannelLeft = () => {
  return (
    <div>
      <h1>Welcome Back!</h1>
      <p>To keep connected with us please login with your personal info</p>
    </div>
  );
};

const PannelRight = () => {
  return (
    <div>
      <h1>Hello, Friend!</h1>
      <p>Enter your personal details and start journey with us</p>
    </div>
  );
};

const Signup = () => {
  const [user, setUser] = useState(intialState);
  //ui will render according to isSignUp state
  const [isSignUp, setIsSignUp] = useState(true);

  const onChangeHandle = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isSignUp) {
      authServices.register(user);
    } else {
      authServices.login({
        username: user.email || user.phone,
        password: user.password,
      });
    }
  };

  const switchMode = () => {
    setIsSignUp((prevIsSignUp) => !prevIsSignUp);
  };

  return (
    <div className="main_component">
      <div
        className={`container ${isSignUp ? "" : "right-panel-active"}`}
        id="container"
      >
        <div
          className={`form-container ${
            isSignUp ? "sign-in-container" : "sign-up-container"
          }`}
        >
          <form>
            <h1>{isSignUp ? "Sing In" : "Create Account"}</h1>
            {!isSignUp && (
              <input
                name="name"
                type="text"
                placeholder="Name"
                onChange={(e) => onChangeHandle(e)}
                required
              />
            )}
            <input
              name="email"
              type="email"
              placeholder="Email"
              onChange={(e) => onChangeHandle(e)}
              required
            />
            {!isSignUp && (
              <>
                <input
                  name="phone"
                  type="text"
                  placeholder="Phone"
                  onChange={(e) => onChangeHandle(e)}
                  required
                />
                <select
                  name="role"
                  className="select_box"
                  onChange={(e) => onChangeHandle(e)}
                >
                  <option value="student">Student</option>
                  <option value="teacher">Teacher</option>
                </select>
              </>
            )}
            <input
              name="password"
              type="password"
              placeholder="Password"
              onChange={(e) => onChangeHandle(e)}
              required
            />
            {/* show opposite of singup */}
            <button onClick={handleSubmit}>
              {isSignUp ? "Sign In" : "Sign Up"}
            </button>
          </form>
        </div>
        <div className="overlay-container">
          <div className="overlay">
            <div
              className={`overlay-panel ${
                isSignUp ? "overlay-right" : "overlay-left"
              }`}
            >
              {isSignUp ? <PannelRight /> : <PannelLeft />}
              <button
                className="ghost"
                id={isSignUp ? "signUp" : "signIn"}
                onClick={switchMode}
              >
                {isSignUp ? "Sign Up" : "Sign In"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
