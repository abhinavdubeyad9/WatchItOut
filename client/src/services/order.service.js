import history from "../utils/history";
import { LocalStorage } from "../utils/localStorage";
import { URLs } from "../constants/urls";
import api from "../apis";

const getToken = () => {
  const token = LocalStorage.getFromLocalStorage("token");
  return token;
};

const getOrderForAdmin = async () => {
  return await api
    .get(URLs.ORDER, {
      headers: { "Authorization": `Bearer ${getToken()}` },
    })
    .then((res) => {
      return res.data.result;
    })
    .catch((err) => {
      return err;
    });
};

const getOrderByUserId = async (userId) => {
  return await api
    .get(`${URLs.ORDER}/${userId}`, {
      headers: { "Authorization": `Bearer ${getToken()}` },
    })
    .then((res) => {
      return res.data.result;
    })
    .catch((err) => {
      return err;
    });
};

const postOrder = async (data) => {
  await api
    .post(URLs.ORDER, data, {
      headers: { "Authorization": `Bearer ${getToken()}` },
    })
    .then((res) => {
      history.push("/dashboard");
      console.log(res);
      return res;
    })
    .catch((err) => {
      return err;
    });
};

const validateOrder = async (productId) => {
  return await api
    .get(`${URLs.VALIDATE_ORDER}/${productId}`, {
      headers: { "Authorization": `Bearer ${getToken()}` },
    })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });
};

export const OrderService = {
  postOrder,
  getOrderForAdmin,
  getOrderByUserId,
  validateOrder,
};
