import { useState } from "react";

export function useField(validate) {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");

  function onChange(e) {
    const next = e.target.value;
    setValue(next);
    setError(validate(next));
  }

  return { value, error, onChange };
}
