import { SIGN_IN, SIGN_OUT } from "../actions/type";

const INTIAL_STATE = {
  isAuth: null,
  userId: null,
  name: null,
  role: null,
};

// eslint-disable-next-line
export default (state = INTIAL_STATE, action) => {
  switch (action.type) {
    case SIGN_IN:
      const { userId, name, role } = action.payload;
      return { ...state, isAuth: true, userId, name, role };
    case SIGN_OUT:
      return { ...state, isAuth: false, userId: null };
    default:
      return state;
  }
};
