import React, { useState } from "react";
import axios from "axios";

export default function AdmissionFormCard() {
  const [formData, setFormData] = useState({
    fullname: "",
    cnic: "",
    email: "",
    phone: "",
    course: "",
    batch: "",
    feeplan: "",
    totalFee: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    const emptyFields = Object.entries(formData)
      .filter(([_, value]) => !value)
      .map(([key]) => key);

    if (emptyFields.length > 0) {
      setError("Please fill all fields.");
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        "http://localhost:5000/api/admission/create",
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage(res.data.message);
      setFormData({
        fullname: "",
        cnic: "",
        email: "",
        phone: "",
        course: "",
        batch: "",
        feeplan: "",
        totalFee: "",
      });
    } catch {
      setError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const textInputs = [
    { label: "Full Name", name: "fullname", type: "text", placeholder: "Enter student name" },
    { label: "CNIC", name: "cnic", type: "text", placeholder: "12345-1234567-1" },
    { label: "Email", name: "email", type: "email", placeholder: "student@email.com" },
    { label: "Phone", name: "phone", type: "text", placeholder: "0300-1234567" },
    { label: "Total Fee", name: "totalFee", type: "number", placeholder: "Enter amount" },
  ];

  const selectInputs = [
    {
      label: "Course",
      name: "course",
      options: ["Web Development", "Graphic Designing", "Digital Marketing", "SEO"],
    },
    {
      label: "Batch Timing",
      name: "batch",
      options: [
        "Morning (9:00 AM - 12:00 PM)",
        "Afternoon (2:00 PM - 5:00 PM)",
        "Evening (6:00 PM - 9:00 PM)",
      ],
    },
    {
      label: "Fee Plan",
      name: "feeplan",
      options: ["Full Payment", "Monthly Installments", "Quarterly Installments"],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-white border rounded-lg p-8 shadow">
        {/* HEADER */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-[#0b2a44]">
            New Admission
          </h2>
          <p className="text-sm text-gray-500">
            Register a new student into the system
          </p>
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
        <form
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
          onSubmit={handleSubmit}
        >
          {/* TEXT INPUTS */}
          {textInputs.map((field) => (
            <div key={field.name} className="flex flex-col">
              <label className="text-sm font-medium text-[#0b2a44] mb-1">
                {field.label}
              </label>
              <input
                type={field.type}
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                placeholder={field.placeholder}
                className={`border px-3 py-2 rounded text-sm focus:ring-2 focus:ring-[#F8AF2A] outline-none ${
                  !formData[field.name] && error
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
              />
            </div>
          ))}

          {/* SELECT INPUTS */}
          {selectInputs.map((select) => (
            <div key={select.name} className="flex flex-col">
              <label className="text-sm font-medium text-[#0b2a44] mb-1">
                {select.label}
              </label>
              <select
                name={select.name}
                value={formData[select.name]}
                onChange={handleChange}
                className={`border px-3 py-2 rounded text-sm focus:ring-2 focus:ring-[#F8AF2A] outline-none ${
                  !formData[select.name] && error
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
              >
                <option value="">Select {select.label.toLowerCase()}</option>
                {select.options.map((opt) => (
                  <option key={opt}>{opt}</option>
                ))}
              </select>
            </div>
          ))}

          {/* SUBMIT */}
          <div className="md:col-span-2 flex justify-center mt-4">
            <button
              type="submit"
              disabled={loading}
              className={`bg-[#0b2a44] text-white px-10 py-2.5 rounded text-sm font-semibold hover:bg-[#0b2a44]/90 transition ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Submitting..." : "Complete Admission"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
