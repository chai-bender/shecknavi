import React, { useState } from "react";
import NavTabs from "../components/NavTabs";
import { Link } from "react-router-dom";
import "../css/login.css";
import { LOGIN_USER } from "../utils/mutations";
import { useMutation } from "@apollo/client";
import Auth from "../utils/auth";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, { error, data }] = useMutation(LOGIN_USER);

  const handleUsernameChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    console.log("password", password);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await login({
        variables: { email, password },
      });

      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="loginContainer">
      <form className="loginForm" onSubmit={handleSubmit}>
        <Link to="/Login" />
        <div>
          <label>Email:</label>
          <input type="text" value={email} onChange={handleUsernameChange} />
        </div>
        <br></br>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <br></br>
        <button id="loginBtn" type="submit">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
