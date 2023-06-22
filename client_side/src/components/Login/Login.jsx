import React, { useState } from "react";
import Header from "../header/Header";
import { useNavigate } from "react-router";
import "./styles.css";
const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    let res = await fetch("/signIn", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    res = await res.json();
    if (res.error || !res) {
      window.alert("Invalid Credential");
      console.log("Invalid Credential");
    }
    if (res.message) {
      window.alert("LoggedIn successfully");
      console.log("LoggedIn successfully");
      history("/home");
    }
  };

  return (
    <>
      <Header />
      <div className="signup-container">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">Login</button>
        </form>
      </div>
    </>
  );
};

export default LoginPage;
