import React from "react";
import "./Index.css";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  validateEmail,
  validateName,
  validateRegister,
} from "../../utils/validators";
import TextInput from "../../components/TextInput";
import { useField } from "../../hooks/useField";
import { usePassword } from "../../hooks/usePassword";

// simulate server saved account
function mockRegister(name, email, password) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(), 1500);
  });
}

function Register() {
  const name = useField(validateName);
  const email = useField(validateEmail);
  const pw = usePassword();
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [error, setError] = useState("");

  const navigate = useNavigate();

  //submit function
  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    //validate all four field before submit
    const errMsg = validateRegister(
      name.value,
      email.value,
      pw.password,
      pw.confirmPassword,
    );
    if (errMsg) {
      setStatus("error");
      setError(errMsg);
      return;
    }

    try {
      setStatus("loading");
      await mockRegister(name.value, email.value, pw.password); // pauses here ~1 second
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
          value={pw.password}
          onChange={pw.passwordChange}
          error={pw.passwordError}
        />

        <TextInput
          id="confirmPassword"
          label="Confirm Password"
          type="password"
          value={pw.confirmPassword}
          onChange={pw.confirmPasswordChange}
          error={pw.confirmPasswordError}
        />

        {/* error msg for both */}
        {status === "error" && <p className="error-message">{error}</p>}

        {/* //button UI react to status */}
        <button disabled={status === "loading"}>
          {status === "loading" ? "Registering..." : "Register"}
        </button>
        <p className="switch-link">
          Already have an account? <Link to="/login">Login</Link>
        </p>
        {status === "success" && (
          <p className="success-message">Login success ✅</p>
        )}
      </form>
    </div>
  );
}

export default Register;
