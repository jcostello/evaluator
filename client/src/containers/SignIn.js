import React, { useState } from "react";
import axios from "../utils/axios";

import { useHistory } from "react-router-dom";
import { Row, Col, Alert } from "antd";
import { GoogleLogin } from "react-google-login";

import { setJWT } from "./../utils/userAuthentication";

import logo from "./../components/images/logo.png";

const SignIn = () => {
  const [error, setError] = useState("");
  const history = useHistory();

  const responseGoogleSuccess = async ({ profileObj }) => {
    try {
      const { data } = await axios.post("/api/users/sign_in", {
        email: profileObj.email
      });

      setJWT(data.token);

      history.push("/");
    } catch (e) {
      setError("User doesn't exist in the system");
    }
  };

  const responseGoogleError = async ({ error, details }) => {
    console.log(error, details);
  };

  return (
    <>
      {error ? <Alert type="error" message={error} closable showIcon /> : null}
      <Row
        type="flex"
        justify="center"
        align="middle"
        style={{ height: "100%" }}
      >
        <Col>
          <img
            src={logo}
            alt="logo"
            style={{ marginBottom: "30px", height: "100px" }}
          />
          <Row
            type="flex"
            justify="center"
            align="middle"
            style={{ height: "100%" }}
          >
            <GoogleLogin
              clientId="753581918384-h8h02refd1h49vrg67t9evem7nghpqk6.apps.googleusercontent.com"
              buttonText="Login with Google"
              onSuccess={responseGoogleSuccess}
              onFailure={responseGoogleError}
              cookiePolicy={"single_host_origin"}
            />
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default SignIn;
