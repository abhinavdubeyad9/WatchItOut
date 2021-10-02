import React from "react";
import { Route, Redirect } from "react-router-dom";
import { store } from "./store";

export default function ProtectedRoutes({ component: Component, ...rest }) {
  const isAuth = store.getState().auth.isAuth;

  return (
    <Route
      {...rest}
      render={(props) => {
        if (isAuth) {
          return <Component {...props} />;
        } else {
          return (
            <Redirect
              to={{ pathname: "/login", state: { from: props.location } }}
            />
          );
        }
      }}
    />
  );
}
