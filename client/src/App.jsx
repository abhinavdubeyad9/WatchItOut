import React from "react";
import "./App.css";
import { Route, Router, Switch } from "react-router-dom";
import {
  AdminPage,
  CartPage,
  DashboardPage,
  HomePage,
  LoginPage,
  VideoPage,
} from "./Pages";
import { Navbar, VideoComponent } from "./components";
import ProtectedRoute from "./utils/ProtectedRoutes";
import history from "./utils/history";

const App = () => {
  return (
    <Router history={history}>
      <div>
        <Navbar />
      </div>
      <Switch>
        <Route path="/login" component={LoginPage} />
        <Route exact path="/video" component={VideoPage} />
        <ProtectedRoute path="/dashboard" component={DashboardPage} />
        <ProtectedRoute path="/admin" component={AdminPage} />
        <ProtectedRoute path="/cart" component={CartPage} />
        <Route path="/video/watch" component={VideoComponent} />
        <Route path="/" exact component={HomePage} />
      </Switch>
    </Router>
  );
};

export default App;
