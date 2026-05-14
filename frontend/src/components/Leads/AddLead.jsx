import { useState } from "react";
import axios from "axios";

export default function AddLead({ setSection }) {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    course: "",
    source: "Walk-in",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const courses = [
    "Web Development",
    "Graphic Design",
    "UI / UX Design",
    "Digital Marketing",
    "Mobile App Development",
    "Data Science",
    "Amazon VA",
    "Video Editing",
  ];

  const submitHandler = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!form.name || !form.phone || !form.course) {
      setError("Please fill all required fields.");
      return;
    }

    setLoading(true);
    try {
      await axios.post("http://localhost:5000/api/leads", form);
      setMessage("Lead added successfully!");
      setForm({ name: "", phone: "", course: "", source: "Walk-in" });
      setSection("leads");
    } catch {
      setError("Failed to add lead. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-white border rounded-lg p-8 shadow">

        {/* HEADER */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-[#0b2a44]">Add New Lead</h2>
          <p className="text-sm text-gray-500">Enter student inquiry details</p>
        </div>

        {/* MESSAGES */}
        {message && (
          <div className="mb-6 bg-green-100 text-green-700 px-4 py-3 rounded text-sm">
            {message}
          </div>
        )}
        {error && (
          <div className="mb-6 bg-red-100 text-red-700 px-4 py-3 rounded text-sm">
            {error}
          </div>
        )}

        {/* FORM */}
        <form className="grid grid-cols-1 md:grid-cols-2 gap-5" onSubmit={submitHandler}>

          {/* Name */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-[#0b2a44] mb-1">Full Name</label>
            <input
              type="text"
              placeholder="Enter full name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className={`border px-3 py-2 rounded text-sm focus:ring-2 focus:ring-[#F8AF2A] outline-none ${
                !form.name && error ? "border-red-500" : "border-gray-300"
              }`}
            />
          </div>

          {/* Phone */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-[#0b2a44] mb-1">Phone</label>
            <input
              type="text"
              placeholder="0300-1234567"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className={`border px-3 py-2 rounded text-sm focus:ring-2 focus:ring-[#F8AF2A] outline-none ${
                !form.phone && error ? "border-red-500" : "border-gray-300"
              }`}
            />
          </div>

          {/* Course */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-[#0b2a44] mb-1">Course</label>
            <select
              value={form.course}
              onChange={(e) => setForm({ ...form, course: e.target.value })}
              className={`border px-3 py-2 rounded text-sm focus:ring-2 focus:ring-[#F8AF2A] outline-none ${
                !form.course && error ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="">Select course</option>
              {courses.map((c, i) => (
                <option key={i} value={c}>{c}</option>
              ))}
            </select>
          </div>

          {/* Source */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-[#0b2a44] mb-1">Source</label>
            <select
              value={form.source}
              onChange={(e) => setForm({ ...form, source: e.target.value })}
              className="border px-3 py-2 rounded text-sm focus:ring-2 focus:ring-[#F8AF2A] outline-none border-gray-300"
            >
              <option>Walk-in</option>
              <option>Facebook</option>
              <option>Instagram</option>
              <option>Website</option>
              <option>Reference</option>
            </select>
          </div>

          {/* Submit */}
          <div className="md:col-span-2 flex justify-center mt-4">
            <button
              type="submit"
              disabled={loading}
              className={`bg-[#0b2a44] text-white px-10 py-2.5 rounded text-sm font-semibold hover:bg-[#0b2a44]/90 transition ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Submitting..." : "Add Lead"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
