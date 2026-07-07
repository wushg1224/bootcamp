import React from "react";
import "./Index.css";
import { useState } from "react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  // console.log("current email state:", email);

  // a function that checks the email format and updates emailError
 const handleEmailChange = (e) => {
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

  return (
    <div className="login-container">
      <h1>Login</h1>
      <div className="field">
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
      <input type="password" placeholder="Password" 
      value={password}
      onChange={passwordChange}/>
      {passwordError && <p className="error-message">{passwordError}</p>}
      </div>

      <button>Login</button>
    
    </div>
  );
}

export default Login;
