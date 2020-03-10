import React from "react";
import IconInput from "../Components/IconInput.js";
import login from "../Images/login.svg";
import password from "../Images/Password.svg";
import email from "../Images/email.svg";

import Button from "../Components/Button";
import { Link } from "react-router-dom";
import myAxios from "../axios.js";
import makeToast from "../toast.js";

export default function LoginPage({ history }) {
  const emailRef = React.useRef();
  const passwordRef = React.useRef();

  const loginUser = () => {
    myAxios
      .post("/user/login", {
        email: emailRef.current.value,
        password: passwordRef.current.value
      })
      .then(response => {
        console.log(response.data);
        makeToast("success", response.data.message);
        localStorage.setItem("token", response.data.token);
        history.push("/home");
      })
      .catch(err => {
        console.log(err.response.data.message);
        if (
          err &&
          err.response &&
          err.response.data &&
          err.response.data.message
        )
          makeToast("error", err.response.data.message);
      });
  };

  return (
    <div className="login-page">
      <div className="login-area">
        <div>
          <h3 style={{ marginBottom: "2rem" }}>SIGN IN</h3>
          <IconInput
            placeholder="Email"
            img={email}
            type="email"
            xRef={emailRef}
          />
          <IconInput
            placeholder="Password"
            img={password}
            type="password"
            xRef={passwordRef}
          />
          <Button onClick={loginUser}>Login</Button>
          <h3>OR</h3>
          <Link to="/register">
            <Button variant={3}>Register</Button>
          </Link>
        </div>
        <div>
          <img id="dancing-girl" src={login} alt="" />
        </div>
      </div>
    </div>
  );
}
