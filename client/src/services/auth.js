import { LocalStorage } from "../utils/localStorage";
import { store } from "../utils/store";
import { singIn } from "../actions";
import history from "../utils/history";
import { URLs } from "../constants/urls";
import api from "../apis";

const handleAuthState = (data) => {
  const { id: userId, name, role } = data;
  return store.dispatch(singIn(userId, name, role));
};

const register = async (data) => {
  await api
    .post(URLs.SIGNUP, data)
    .then((res) => {
      if (res.data.id) {
        LocalStorage.saveInLocalStorage("token", res.data.token);
        handleAuthState(res.data);
        history.push("./dashboard");
      } else {
        alert("wrong entry");
      }
    })
    .catch((err) => console.log(err));
};

const login = async (data) => {
  await api
    .post(URLs.LOGIN, data)
    .then((res) => {
      if (res.data.id) {
        LocalStorage.saveInLocalStorage("token", res.data.token);
        handleAuthState(res.data);
        const role = res.data.role;
        if (role === "admin") return history.push("/admin");
        history.push("./dashboard");
      } else {
        alert("invalid username/password");
      }
    })
    .catch((err) => console.log(err));
};

const logout = () => {
  LocalStorage.clearLocalStorage();
  window.location.reload();
  history.push("/");
};

export const authServices = {
  register,
  login,
  logout,
};
