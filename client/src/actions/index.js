import { SIGN_IN, SIGN_OUT } from "./type";

export const singIn = (userId, name, role) => {
  return {
    type: SIGN_IN,
    payload: {
      userId,
      name,
      role,
    },
  };
};

export const signOut = () => {
  return {
    type: SIGN_OUT,
  };
};
