import { useState } from "react";
import axios from "axios";

export default function AddLead() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    course: "",
    source: "Walk-in",
  });

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5000/api/leads", form);
      alert("Lead added successfully");
      setForm({ name: "", phone: "", course: "", source: "Walk-in" });
    } catch (err) {
      alert("Error adding lead");
    }
  };

  return (
    <form onSubmit={submitHandler} className="p-4 space-y-3">
      <input
        className="input"
        placeholder="Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />

      <input
        className="input"
        placeholder="Phone"
        value={form.phone}
        onChange={(e) => setForm({ ...form, phone: e.target.value })}
      />

      <input
        className="input"
        placeholder="Course"
        value={form.course}
        onChange={(e) => setForm({ ...form, course: e.target.value })}
      />

      <select
        className="input"
        value={form.source}
        onChange={(e) => setForm({ ...form, source: e.target.value })}
      >
        <option>Walk-in</option>
        <option>Facebook</option>
        <option>Instagram</option>
      </select>

      <button className="btn">Add Lead</button>
    </form>
  );
}
