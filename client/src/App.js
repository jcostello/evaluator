import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import PrivateRoute from "./components/PrivateRoute";
import SignIn from "./containers/SignIn";
import AdminLayout from "./containers/layouts/AdminLayout";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/sign_in" component={SignIn} />
        <PrivateRoute path="/">
          <AdminLayout />
        </PrivateRoute>
      </Switch>
    </Router>
  );
}

export default App;
