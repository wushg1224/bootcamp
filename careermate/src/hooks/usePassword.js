import { useState } from "react";
import { validatePassword, validateConfirmPassword } from "../utils/validators";

export function usePassword() {
  // useState Setup for variables
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  // a function to set password and pw error if confirmed password exist then shwo eoor

  const passwordChange = (e) => {
    const value = e.target.value;
    setPassword(value); //
    setPasswordError(validatePassword(value));

    // check confirm password match
    if (confirmPassword) {
      setConfirmPasswordError(validateConfirmPassword(confirmPassword, value));
    }
  };

  function handleConfirmPasswordChange(e) {
    const value = e.target.value;
    setConfirmPassword(value);
    setConfirmPasswordError(validateConfirmPassword(value, password));
  }

  // Return everything the component still needs
  return {
    password,
    passwordError,
    passwordChange,
    confirmPassword,
    confirmPasswordError,
    confirmPasswordChange: handleConfirmPasswordChange,
  };
}
