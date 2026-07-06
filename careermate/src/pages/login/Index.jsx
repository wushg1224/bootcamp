import React from "react";
import "./Index.css";
import { useState } from "react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
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
      
      <input type="password" placeholder="Password" 
      value={password}
      onChange={(e)=> {
    setPassword(e.target.value);
    // console.log("password input:", e.target.value);
  }}/>
      <button>Login</button>
    
    </div>
  );
}

export default Login;
