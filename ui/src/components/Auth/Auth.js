import React from "react";
import Login from "./Login/Login";
import "./Auth.scss";

const Auth = () => {
  return (
    <div className="auth">
      <h1>Войти</h1>
      <Login />
    </div>
  );
};

export default Auth;
