import React from "react";
import "./home.css";
import Counter from "../../components/Counter/Counter";

function Home() {
  return (
    <div className="home-container">
      <h1>Welcome to CareerMate!</h1>
      <p>You have successfully logged in.</p>
      <Counter />
    </div>
  );
}

export default Home;
