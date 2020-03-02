import React from "react";

import { Layout } from "antd";
import { withRouter } from "react-router-dom";

import { removeJWT } from "./../../utils/userAuthentication";

import NavBar from "./../../components/NavBar";
import PrivateRoute from "./../../components/PrivateRoute";
import Home from "./../Home";
import Forms from "./../Forms";
import Users from "./../Users";
import Teams from "./../Teams";

const { Content } = Layout;

const AdminLayout = ({ history }) => {
  const onSignOut = () => {
    removeJWT();

    history.push("/sign_in");
  };

  return (
    <>
      <NavBar onSignOut={onSignOut} />

      <Layout className="layout" style={{ height: "100%" }}>
        <Content style={{ padding: "50px", height: "100%" }}>
          <PrivateRoute path="/">
            <Home />
          </PrivateRoute>
          <PrivateRoute path="/forms">
            <Forms />
          </PrivateRoute>
          <PrivateRoute path="/users">
            <Users />
          </PrivateRoute>
          <PrivateRoute path="/teams">
            <Teams />
          </PrivateRoute>
        </Content>
      </Layout>
    </>
  );
};

export default withRouter(AdminLayout);
