import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isUserAuthenticated } from "./../utils/userAuthentication";

const PrivateRoute = ({ component: Component, ...rest }) => {
  return isUserAuthenticated() ? (
    <Route {...rest} render={() => rest.children} />
  ) : (
    <Redirect to="/sign_in" />
  );
};

export default PrivateRoute;
