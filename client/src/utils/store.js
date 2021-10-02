//this file will help to access redux state outside of react component
import { createStore, applyMiddleware, compose } from "redux";
import reducers from "../reducers";
import reduxThunk from "redux-thunk";

import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

//this will enable redux devtool extention
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = createStore(
  persistedReducer,
  composeEnhancers(applyMiddleware(reduxThunk))
);

export const presistor = persistStore(store);
