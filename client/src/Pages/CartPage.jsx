import React from "react";
import { store } from "../utils/store";
import { Button } from "@mui/material";
import "../Styles/CartPage.css";
import { OrderService } from "../services/order.service";

const CartPage = ({ history }) => {
  const {
    productId,
    name: productName,
    price,
    image,
  } = history.location.state || "";
  const { userId, name: userName } = store.getState().auth;

  if (history.location.state === null) {
    return <h1 className="testing">Your cart is empty</h1>;
  }

  const handleCheckout = () => {
    const data = {
      productId,
      productName,
      userId,
      image,
      userName,
    };

    OrderService.postOrder(data);
  };

  return (
    <div>
      <div className="products">
        <div className="product-card">
          <div className="product-image">
            <img src={image} alt={productName} />
          </div>
          <div className="product-info">
            <h3>{productName}</h3>
            <h4>{price}</h4>
          </div>
          <div className="button-container">
            <Button
              variant="contained"
              className="button-btn"
              onClick={() => {
                handleCheckout();
              }}
            >
              checkout
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
