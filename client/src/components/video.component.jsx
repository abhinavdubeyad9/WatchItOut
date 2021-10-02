import React, { useState, useEffect } from "react";
import "../Styles/VideoComponent.css";
import { store } from "../utils/store";
import { OrderService } from "../services/order.service";
import { videoService } from "../services/video.service";

function VideoComponent({ history }) {
  const [video, setVideo] = useState([]);
  const [loading, setLoading] = useState(true);

  const getVideo = (productId) => {
    videoService
      .getVideoLink(productId)
      .then((res) => {
        setVideo(res.result);
        setLoading(false);
      })
      .catch((err) => {
        return <h1>Error link not found</h1>;
      });
  };

  useEffect(() => {
    //if histoy prop is not passed
    if (!history.location.state) {
      return history.push("/");
    }

    const { productId, price } = history.location.state;
    const { role } = store.getState().auth;

    if (price === "Free" || role === "admin") {
      return getVideo(productId);
    }

    OrderService.validateOrder(productId)
      .then((res) => {
        if (res.purchased) {
          return getVideo(productId);
        }
        return <h1>You have not purchased this video</h1>;
      })

      .catch((err) => {
        return <h1>Error video not found</h1>;
      });
    // eslint-disable-next-line
  }, []);

  if (loading) {
    return <h1 className="testing">Loading</h1>;
  }

  return (
    <div className="video_component">
      <iframe
        className="video"
        src={video.link}
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      />
    </div>
  );
}

export default VideoComponent;
