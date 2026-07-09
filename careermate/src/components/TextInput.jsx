export default function TextInput({
  id,
  label,
  type = "text",
  value,
  onChange,
  error,
  placeholder = label,
}) {
  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      {error && <p className="error-message">{error}</p>}
    </div>
  );
}
