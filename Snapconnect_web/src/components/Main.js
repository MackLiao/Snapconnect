import React, { useState } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Home from "./Home";

const Main = (props) => {
  const { handleLoggedIn, isLoggedIn } = props;

  const login = () => {
    return isLoggedIn ? (
      <Redirect to="/home" />
    ) : (
      <Login handleLoggedIn={handleLoggedIn} />
    );
  };

  const showHome = () => {
    return isLoggedIn ? <Home /> : <Redirect to="/login" />;
  };

  return (
    <div className="main">
      <Switch>
        <Route exact path="/" render={showHome} />
        <Route path={"/login"} render={login} />
        <Route path={"/register"} component={Register} />
        <Route path={"/home"} render={showHome} />
      </Switch>
    </div>
  );
};

export default Main;
