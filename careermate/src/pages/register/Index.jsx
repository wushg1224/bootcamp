import React from "react";
import "./Index.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  validateConfirmPassword,
  validateEmail,
  validateName,
  validatePassword,
  validateRegister,
} from "../../utils/validators";
import TextInput from "../../components/TextInput";
import { useField } from "../../hooks/useField";

// simulate server saved account
function mockRegister(name, email, password) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(), 1500);
  });
}

function Register() {
  const name = useField(validateName);
  const email = useField(validateEmail);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [error, setError] = useState("");

  const navigate = useNavigate();

  // a function that check the password format
  const passwordChange = (e) => {
    const value = e.target.value;
    setPassword(value); //
    setPasswordError(validatePassword(value));

    // check confirm password match
    setConfirmPasswordError(validateConfirmPassword(confirmPassword, value));
  };
  // a function that check the confirm password format
  function handleConfirmPasswordChange(e) {
    const value = e.target.value;
    setConfirmPassword(value);
    setConfirmPasswordError(validateConfirmPassword(value, password));
  }

  //submit function
  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    //validate all four field before submit
    const errMsg = validateRegister(
      name.value,
      email.value,
      password,
      confirmPassword,
    );
    if (errMsg) {
      setStatus("error");
      setError(errMsg);
      return;
    }

    try {
      setStatus("loading");
      await mockRegister(name.value, email.value, password); // pauses here ~1 second
      setStatus("success");
      navigate("/login");
    } catch (err) {
      console.log(err);
      setStatus("error");
      setError(err.message); // "Incorrect email or password"
    }
  }

  return (
    <div className="register-page">
      <form className="register-container" onSubmit={handleSubmit} noValidate>
        <h1>CareerMate Register</h1>

        <TextInput
          id="name"
          label="Name"
          value={name.value}
          onChange={name.onChange}
          error={name.error}
          autoComplete="off"
        />

        <TextInput
          id="email"
          label="Email"
          type="email"
          value={email.value}
          onChange={email.onChange}
          error={email.error}
          autoComplete="off"
        />

        <TextInput
          id="password"
          label="Password"
          type="password"
          value={password}
          onChange={passwordChange}
          error={passwordError}
        />

        <TextInput
          id="confirmPassword"
          label="Confirm Password"
          type="password"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
          error={confirmPasswordError}
        />

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
    </div>
  );
}

export default Register;
