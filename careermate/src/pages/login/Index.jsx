import React from "react";
import "./Index.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import {
  validateEmail,
  validatePassword,
  validateLogin,
} from "../../utils/validators";
import TextInput from "../../components/TextInput";
import { useField } from "../../hooks/useField";

function mockLogin(email, password) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email === "ceci@gmail.com" && password === "123456") {
        resolve();
      } else {
        reject(new Error("Incorrect email or password"));
      }
    }, 5000);
  });
}
function Login() {
  const email = useField(validateEmail);
  const password = useField(validatePassword);
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    const errMsg = validateLogin(email.value, password.value);
    if (errMsg) {
      setStatus("error");
      setError(errMsg);
      return;
    }

    try {
      setStatus("loading");
      await mockLogin(email.value, password.value); // pauses here ~1 second
      setStatus("success");
      navigate("/home");
    } catch (err) {
      console.log(err);
      setStatus("error");
      setError(err.message); // "Incorrect email or password"
    }
  }

  return (
    <form className="login-container" onSubmit={handleSubmit} noValidate>
      <h1>Login</h1>

      <TextInput
        label="Email"
        id="email"
        type="email"
        value={email.value}
        onChange={email.onChange}
        error={email.error}
        autoComplete="off"
      />

      <TextInput
        label="Password"
        id="password"
        type="password"
        value={password.value}
        onChange={password.onChange}
        error={password.error}
      />

      {/* error msg for both */}
      {status === "error" && <p className="error-message">{error}</p>}

      {/* //button UI react to status */}
      <button disabled={status === "loading"}>
        {status === "loading" ? "Logging in..." : "Login"}
      </button>

      {status === "success" && (
        <p className="success-message">Login success ✅</p>
      )}
      {/* jummp to register page */}
      <p className="switch-link">
        Don't have an account? <Link to="/register">Register</Link>
      </p>
    </form>
  );
}

export default Login;
