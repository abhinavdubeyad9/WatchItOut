import React, { useEffect, useState } from "react";
import moment from "moment";
import history from "../utils/history";
import { store } from "../utils/store";
import { OrderService } from "../services/order.service";

import "../Styles/AdminPage.css";

const AdminPage = () => {
  const { name, role } = store.getState().auth;
  const [usersList, setUsersList] = useState([]);
  const [loading, setLoading] = useState(true);

  if (role !== "admin") {
    history.push("/");
  }

  const timeAgo = (createdAt) => {
    return moment(createdAt).fromNow();
  };

  useEffect(() => {
    OrderService.getOrderForAdmin()
      .then((res) => {
        setUsersList(res);
        setLoading(false);
      })
      .catch((err) => {
        return <h1>Error</h1>;
      });
  }, []);

  if (loading) {
    return <h1 className="testing">Loading...</h1>;
  }

  return (
    <div className="admin_container">
      <h1 className="custom_text">Hello {name} !</h1>

      <div className="icon">
        <i className="fa fa-clock-o"></i>
        <span className="icon_text">Purchase history</span>
      </div>

      <table className="table">
        <thead>
          <th>Users</th>
          <th>Purchased</th>
          <th>Time</th>
        </thead>
        <tbody>
          {usersList.map((x, idx) => (
            <tr>
              <td>{x.userName}</td>
              <td>{x.productName}</td>
              <td>{timeAgo(x.createdAt)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPage;
