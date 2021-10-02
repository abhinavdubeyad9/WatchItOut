import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import "../Styles/VideoPage.css";
import { store } from "../utils/store";
import { useHistory } from "react-router-dom";
import { videoService } from "../services/video.service";

function VideoPage() {
  const [videoList, setVideoList] = useState([]);
  const [loading, setLoading] = useState(true);
  const { role } = store.getState().auth;
  const history = useHistory();

  useEffect(() => {
    let list = [...videoList];
    videoService
      .getVideos()
      .then((res) => {
        list = res;
        setVideoList(list);
        setLoading(false);
      })
      .catch((err) => console.log(err));
    // eslint-disable-next-line
  }, []);

  const handleWatch = (video) => {
    history.push({
      pathname: "/video/watch",
      state: {
        productId: video.id,
        name: video.name,
        price: video.price,
        image: video.image,
      },
    });
  };

  const handleBuy = (video) => {
    history.push({
      pathname: "/cart",
      state: {
        productId: video.id,
        name: video.name,
        price: video.price,
        image: video.image,
      },
    });
  };

  if (loading) {
    return <h1 className="testing">loading....</h1>;
  }

  return (
    <div>
      <h1 className="testing">We provide Awesome videos</h1>
      <div className="products">
        {videoList.map((x, idx) => {
          return (
            <div className="product-card">
              <div className="product-image">
                <img src={x.image} alt={x.name} />
              </div>
              <div className="product-info">
                <h3>Title: {x.name}</h3>
                <h4>Price: {x.price}</h4>
              </div>
              <div className="button-container">
                {(x.price === "Free" || role === "admin") && (
                  <Button
                    variant="contained"
                    className="button-btn"
                    onClick={() => {
                      handleWatch(x);
                    }}
                  >
                    Watch
                  </Button>
                )}
                {role !== "admin" && (
                  <Button
                    variant="outlined"
                    className="button-btn"
                    onClick={() => handleBuy(x)}
                  >
                    Buy
                  </Button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
export default VideoPage;
