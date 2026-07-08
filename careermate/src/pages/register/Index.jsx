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
};

//a function that check the name
function handleNameChange(e) {
  const value = e.target.value;
  setName(value);

if (!value.trim()) {
  setNameError("Name is required");
} 
else if (value.length > 30) {
  setEmailError("max 30 characters");
} else {
  setEmailError("");
}
};

// a function that check the password format
const passwordChange = (e) => {
  const value = e.target.value;   // 1. grab what was typed
  setPassword(value);              // 2. update state → input shows it
  // 3. run the rules, set or clear the error

if (!value.trim()) {
  setPasswordError("Password is required");
} else if (	value.length < 6) {
  setPasswordError("Password must be at least 6 characters");
} else if (value.length > 20) {
  setPasswordError("Password must be less than 20 characters");
} else {
  setPasswordError("");
}};

//function for validate 2 fileds before form submit
function validate(email, password) {
  if (!email.trim() || !password.trim()) return "All fields are required";
  if (!email.includes("@")) return "Invalid email format";
  if (password.length < 6) return "Password must be at least 6 characters";
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
    await mockRegister(email, password);   // pauses here ~1 second
    setStatus("success");
    navigate("/login"); 
  } catch (err) {
    console.log(err)
    setStatus("error");
    setError(err.message);              // "Incorrect email or password"
  }
}


  return (
    <form className="login-container" onSubmit={handleSubmit} noValidate>
      <h1>CareerMate Register</h1>

  <div className="field">
  <label htmlFor="name">Name</label>
  <input id="name" placeholder="Name" type="text" value={name} onChange={handleNameChange} />
  {nameError && <p className="error-message">{nameError}</p>}
</div>
      <div className="field">
         <label htmlFor="email">Email</label>
      <input type="email" 
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
      <input type="password" placeholder="Password" 
      value={password}
      onChange={passwordChange}/>
      {passwordError && <p className="error-message">{passwordError}</p>}
      </div>
      {/* error msg for both */}
      {status === "error" && <p className="error-message">{error}</p>}

{/* //button UI react to status */}
      <button disabled={status === "loading"}>
  {status === "loading" ? "Registering..." : "Register"}
</button>

{status === "success" && <p className="success-message">Login success ✅</p>}
    
    </form>
  );
}

export default Register;
