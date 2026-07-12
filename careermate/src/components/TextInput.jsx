import { useEffect, useRef } from "react";

export default function TextInput({
  id,
  label,
  type = "text",
  value,
  onChange,
  error,
  placeholder = label,
  autoFocus = false,
  ...rest
}) {
  const inputRef = useRef(null);
  useEffect(() => {
    if (autoFocus) {
      inputRef.current?.focus();
    }
  }, []);

  return (
    <div className="field">
      {label && <label htmlFor={id}>{label}</label>}
      <input
        ref={inputRef}
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        {...rest}
      />
      {error && <p className="error-message">{error}</p>}
    </div>
  );
}
