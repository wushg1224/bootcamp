import React from "react";
import "./Index.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// simulate server saved account
function mockRegister(name, email, password) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(), 1500);
  });
}
function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [error, setError] = useState("");

  const navigate = useNavigate();

  // a function that checks the email format and updates emailError
  function handleEmailChange(e) {
    const value = e.target.value;
    setEmail(value);

    if (!value.trim()) {
      setEmailError("Email is required");
    } else if (!value.includes("@")) {
      setEmailError("Invalid email format");
    } else if (value.length > 50) {
      setEmailError("Email must be less than 50 characters");
    } else {
      setEmailError("");
    }
  }

  //a function that check the name
  function handleNameChange(e) {
    const value = e.target.value;
    setName(value);

    if (!value.trim()) {
      setNameError("Name is required");
    } else if (value.length > 30) {
      setNameError("max 30 characters");
    } else {
      setNameError("");
    }
  }

  // a function that check the password format
  const passwordChange = (e) => {
    const value = e.target.value; // 1. grab what was typed
    setPassword(value); // 2. update state → input shows it
    // 3. run the rules, set or clear the error

    if (!value.trim()) {
      setPasswordError("Password is required");
    } else if (value.length < 6) {
      setPasswordError("Password must be at least 6 characters");
    } else if (value.length > 20) {
      setPasswordError("Password must be less than 20 characters");
    } else {
      setPasswordError("");
    }

    // check confirm password match
    if (confirmPassword && value !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match");
    } else {
      setConfirmPasswordError("");
    }
  };
  // a function that check the confirm password format
  function handleConfirmPasswordChange(e) {
    const value = e.target.value;
    setConfirmPassword(value);

    if (!value.trim()) {
      setConfirmPasswordError("Confirm Password is required");
    } else if (value !== password) {
      setConfirmPasswordError("Passwords do not match");
    } else {
      setConfirmPasswordError("");
    }
  }

  //function for validate all 4 fileds before form submit
  function validate() {
    if (
      !email.trim() ||
      !password.trim() ||
      !name.trim() ||
      !confirmPassword.trim()
    )
      return "All fields are required";
    if (name.length > 30) return "Name must be less than 30 characters";
    if (!email.includes("@")) return "Invalid email format";
    if (password.length < 6) return "Password must be at least 6 characters";
    if (password !== confirmPassword) return "Passwords do not match";
    return null;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    const errMsg = validate(email, password);
    if (errMsg) {
      setStatus("error");
      setError(errMsg);
      return;
    }

    try {
      setStatus("loading");
      await mockRegister(name, email, password); // pauses here ~1 second
      setStatus("success");
      navigate("/login");
    } catch (err) {
      console.log(err);
      setStatus("error");
      setError(err.message); // "Incorrect email or password"
    }
  }

  return (
    <form className="login-container" onSubmit={handleSubmit} noValidate>
      <h1>CareerMate Register</h1>

      <div className="field">
        <label htmlFor="name">Name</label>
        <input
          id="name"
          placeholder="Name"
          type="text"
          value={name}
          onChange={handleNameChange}
        />
        {nameError && <p className="error-message">{nameError}</p>}
      </div>
      <div className="field">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          placeholder="Email"
          value={email}
          autoComplete="off"
          onChange={handleEmailChange}
        />
        {emailError && <p className="error-message">{emailError}</p>}
        {/* <p>Email: {email}</p> */}
      </div>

      {/* render error msg */}
      <div className="field">
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={passwordChange}
        />
        {passwordError && <p className="error-message">{passwordError}</p>}
      </div>

      <div className="field">
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          id="confirmPassword"
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
        />
        {confirmPasswordError && (
          <p className="error-message">{confirmPasswordError}</p>
        )}
      </div>

      {/* error msg for both */}
      {status === "error" && <p className="error-message">{error}</p>}

      {/* //button UI react to status */}
      <button disabled={status === "loading"}>
        {status === "loading" ? "Registering..." : "Register"}
      </button>

      {status === "success" && (
        <p className="success-message">Login success ✅</p>
      )}
    </form>
  );
}

export default Register;
