import { LocalStorage } from "../utils/localStorage";
import { URLs } from "../constants/urls";
import api from "../apis";

const getToken = () => {
  const token = LocalStorage.getFromLocalStorage("token");
  return token;
};

const getVideos = () => {
  return api
    .get(URLs.PRODUCT)
    .then((result) => {
      return result.data;
    })
    .catch((err) => {
      return err;
    });
};

const getVideoLink = (id) => {
  return api
    .get(`${URLs.PRODUCT}/${id}`, {
      headers: { "Authorization": `Bearer ${getToken()}` },
    })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });
};

export const videoService = {
  getVideos,
  getVideoLink,
};
