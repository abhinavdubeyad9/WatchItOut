import React, { useState, useEffect } from "react";
import { withRouter, useHistory } from "react-router-dom";
import { store } from "../utils/store";
import { OrderService } from "../services/order.service";
import { Button } from "@mui/material";
import "../Styles/DashBoard.css";

function DashboardPage() {
  const [purchaseList, setPurchaseList] = useState([]);
  const { name, userId } = store.getState().auth;
  const [loading, setLoading] = useState(true);
  const history = useHistory();

  useEffect(() => {
    let list = [...purchaseList];
    OrderService.getOrderByUserId(userId).then((res) => {
      list = res;
      setPurchaseList(list);
      setLoading(false);
    });
    // eslint-disable-next-line
  }, []);

  const handleWatch = (video) => {
    history.push({
      pathname: "/video/watch",
      state: {
        productId: video.productId,
        name: video.productName,
        price: video.price,
        image: video.image,
      },
    });
  };

  if (loading) {
    <h1 className="testing">Loading..</h1>;
  }

  return (
    <div>
      <h1 className="testing">Welcome {name} !</h1>
      <div className="products">
        {purchaseList.length === 0 ? (
          <h1 className="text">You haven't purchased anything yet</h1>
        ) : (
          purchaseList.map((x, idx) => {
            return (
              <div className="product-card" key={idx}>
                <div className="product-image">
                  <img src={x.image} alt={x.productName} />
                </div>
                <div className="product-info">
                  <h3>{x.productName}</h3>
                </div>
                <div className="button-container">
                  <Button
                    variant="contained"
                    className="button-btn"
                    onClick={() => {
                      handleWatch(x);
                    }}
                  >
                    Watch
                  </Button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default withRouter(DashboardPage);
