import React, { useState } from "react";
import { useNavigate } from "react-router";

import Header from "../header/Header";
import "./styles.css";
const SignUp = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    work: "",
    password: "",
    cpassword: "",
  });
  const history = useNavigate();
  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    console.log(name, value);
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, phone, work, password, cpassword } = user;
    let res = await fetch("/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        phone,
        work,
        password,
        cpassword,
      }),
    });
    res = await res.json();
    // console.log(res.error);
    if (res.error || !res) {
      window.alert("fill all fields");
      console.log("fill all fields");
    }
    if (res.message) {
      window.alert("registrationful suceess");
      console.log("registrationful suceess");
      history("/login");
    }
  };
  return (
    <>
      <Header />
      <div className="signup-container">
        <h2>Sign Up</h2>
        <form method="POST" onSubmit={handleSubmit}>
          <label htmlFor="name">Username:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={user.name}
            onChange={handleInput}
          />
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            id="email"
            name="email"
            value={user.email}
            onChange={handleInput}
          />
          <label htmlFor="phone">Phone:</label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={user.phone}
            onChange={handleInput}
          />
          <label htmlFor="work">Work:</label>
          <input
            type="text"
            id="work"
            name="work"
            value={user.work}
            onChange={handleInput}
          />

          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={user.password}
            onChange={handleInput}
          />
          <label htmlFor="cpassword">Confirm Password:</label>
          <input
            type="password"
            id="cpassword"
            name="cpassword"
            value={user.cpasswordpassword}
            onChange={handleInput}
          />

          <button type="submit">Sign Up</button>
        </form>
      </div>
    </>
  );
};

export default SignUp;
