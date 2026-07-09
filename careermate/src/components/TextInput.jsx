export default function TextInput({
  id,
  label,
  type = "text",
  value,
  onChange,
  error,
  placeholder = label,
  ...rest
}) {
  return (
    <div className="field">
      {label && <label htmlFor={id}>{label}</label>}
      <input
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
