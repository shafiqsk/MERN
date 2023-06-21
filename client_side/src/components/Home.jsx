import React, { useEffect, useState } from "react";
import Header from "./header/Header";
import "./header/styles.css";
const Home = () => {
  const [users, setUser] = useState([]);
  const getUser = async (e) => {
    let res = await fetch("/home", {
      method: "GET",
    });
    res = await res.json();
    setUser(res);
  };
  useEffect(() => {
    getUser();
  }, []);
  return (
    <>
      <Header />
      <div className="container">All User Details</div>
      <hr />
      {users ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "25px",
            fontWeight: 400,
          }}
        >
          <div>
            <ul>
              {users.map((item, index) => {
                return (
                  <div key={index}>
                    <li type="none">Name: {item.name}</li>
                    <li type="none">Email: {item.email}</li>
                    <li type="none">Work: {item.work}</li>
                    <hr />
                  </div>
                );
              })}
            </ul>
          </div>
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "40px",
            fontWeight: 600,
          }}
        >
          "Sorry No users in DATABASE"
        </div>
      )}
    </>
  );
};

export default Home;
