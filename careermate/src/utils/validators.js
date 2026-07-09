export function validateName(value) {
  if (!value.trim()) {
    return "Name is required";
  } else if (value.length > 30) {
    return "max 30 characters";
  } else {
    return "";
  }
}

export function validateEmail(value) {
  if (!value.trim()) {
    return "Email is required";
  } else if (!value.includes("@")) {
    return "Invalid email format";
  } else {
    return "";
  }
}

export function validatePassword(value) {
  if (!value.trim()) {
    return "Password is required";
  } else if (value.length < 6) {
    return "Password must be at least 6 characters";
  } else if (value.length > 20) {
    return "Password must be less than 20 characters";
  } else {
    return "";
  }
}

export function validateConfirmPassword(value, password) {
  if (!value.trim()) {
    return "Confirm Password is required";
  } else if (value !== password) {
    return "Passwords do not match";
  } else {
    return "";
  }
}
export function validateLogin(email, password) {
  const emailError = validateEmail(email);
  if (emailError) return emailError;

  const passwordError = validatePassword(password);
  if (passwordError) return passwordError;

  return null;
}
export function validateRegister(name, email, password, confirmPassword) {
  const nameError = validateName(name);
  if (nameError) return nameError;

  const emailError = validateEmail(email);
  if (emailError) return emailError;

  const passwordError = validatePassword(password);
  if (passwordError) return passwordError;

  const confirmPasswordError = validateConfirmPassword(
    confirmPassword,
    password,
  );
  if (confirmPasswordError) return confirmPasswordError;

  return null;
}
