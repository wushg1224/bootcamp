import "./ProfileForm.css";
import { useState } from "react";

export default function ProfileForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  return (
    <div className="profile-form">
      <h1>Profile Form</h1>
      <input
        type="text"
        placeholder="Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
      {/* show name */}
      <p>{form.name}</p>
      <input
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />
      {/* show email */}
      <p>{form.email}</p>
      <input
        type="text"
        placeholder="Phone"
        value={form.phone}
        onChange={(e) => setForm({ ...form, phone: e.target.value })}
      />
      {/* show phone */}
      <p>{form.phone}</p>
      <input
        type="text"
        placeholder="Address"
        value={form.address}
        onChange={(e) => setForm({ ...form, address: e.target.value })}
      />
      {/* show address */}
      <p>{form.address}</p>
    </div>
  );
}
