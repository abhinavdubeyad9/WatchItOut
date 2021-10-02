import React from "react";
import heroImage from "../assets/hero.png";
import history from "../utils/history";
import { Button } from "@mui/material";
import "../Styles/homepage.css";

function HomePage() {
  return (
    <div className="home_container">
      <h1 className="hero_text">Watch It out</h1>

      <div className="flex_container">
        <div className="flex_child">
          <div className="content">
            <h1 className="content_item ">Welcome to world of Videos</h1>
            <h3 className="content_item ">
              We provide informative video that makes world a better place
            </h3>
            <Button
              variant="outlined"
              className="custom_button content_item "
              onClick={() => {
                history.push("/video");
              }}
            >
              Watch
            </Button>
          </div>
        </div>
        <div className="flex_child image_col ">
          <img src={heroImage} alt="hero" />
        </div>
      </div>
    </div>
  );
}

export default HomePage;
