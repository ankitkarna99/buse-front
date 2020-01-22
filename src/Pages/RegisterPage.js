import React from "react";
import IconInput from "../Components/IconInput.js";
import login from "../Images/login.svg";
import user from "../Images/user.svg";
import password from "../Images/Password.svg";
import email from "../Images/email.svg";
import Button from "../Components/Button";
import { Link } from "react-router-dom";
import myAxios from "../axios";
import makeToast from "../toast";

export default function RegisterPage() {
  const nameRef = React.createRef();
  const emailRef = React.createRef();
  const passwordRef = React.createRef();

  const registerUser = () => {
    console.log("clicked");
    console.log(
      nameRef.current.value,
      passwordRef.current.value,
      emailRef.current.value
    );

    myAxios
      .post("/user/register", {
        email: emailRef.current.value,
        name: nameRef.current.value,
        password: passwordRef.current.value
      })
      .then(response => {
        makeToast("success", response.data.message);
      })
      .catch(err => {
        console.log(err);
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
    <div className="register-page">
      <div className="register-area">
        <div>
          <h3 style={{ marginBottom: "2rem" }}>SIGN UP</h3>
          <IconInput
            placeholder="Full Name"
            img={user}
            type="text"
            xRef={nameRef}
          />
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
          <Button onClick={registerUser}>Register</Button>
          <h3>OR</h3>
          <Link to="/login">
            <Button variant={3}> Login</Button>
          </Link>
        </div>
        <div>
          <img id="dancing-girl" src={login} alt="" />
        </div>
      </div>
    </div>
  );
}
