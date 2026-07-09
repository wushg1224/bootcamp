import { useState } from "react";
import { validateEmail } from "../utils/validators";

export function useEmail() {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");

  function onChange(e) {
    const next = e.target.value;
    setValue(next);
    setError(validateEmail(next));
  }

  return { value, error, onChange };
}
