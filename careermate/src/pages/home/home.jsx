import React from "react";
import "./home.css";
import Counter from "../../components/Counter/Counter";
import ProfileForm from "../../components/ProfileForm/ProfileForm";
import JobList from "../../components/JobList/JobList";

function Home() {
  return (
    <div className="home-container">
      <h1>Welcome to CareerMate!</h1>
      <p>You have successfully logged in.</p>
      <JobList />
      <Counter />
      <ProfileForm />
    </div>
  );
}

export default Home;
