import React, { useState } from "react";
import axios from "axios";

export default function AddTeacher() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    mobile: "",
    department: "",
    designation: "",
    employmentType: "",
    coursesAssigned: [],
    joiningDate: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const departments = ["IT", "Marketing", "HR", "Finance", "Design"];
  const designations = [
    "Instructor",
    "Assistant Instructor",
    "Senior Instructor",
    "Head of Department",
  ];
  const employmentTypes = ["Full-time", "Part-time"];
  const courses = [
    "Web Development",
    "Graphic Designing",
    "Digital Marketing",
    "SEO",
  ];

  // =====================
  // INPUT CHANGE
  // =====================
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  // =====================
  // VALIDATION
  // =====================
  const validate = () => {
    let newErrors = {};

    Object.keys(formData).forEach((key) => {
      if (
        formData[key] === "" ||
        (Array.isArray(formData[key]) && formData[key].length === 0)
      ) {
        newErrors[key] = "This field is required";
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // =====================
  // SUBMIT
  // =====================
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess("");

    if (!validate()) return;

    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      await axios.post(
        "http://localhost:5000/api/teachers/add",
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setSuccess("Teacher added successfully ✅");

      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        mobile: "",
        department: "",
        designation: "",
        employmentType: "",
        coursesAssigned: [],
        joiningDate: "",
      });
    } catch (err) {
      alert(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="max-w-5xl mx-auto bg-white p-8 rounded shadow">
        <h2 className="text-2xl font-semibold text-[#0b2a44] mb-6">
          Add Teacher
        </h2>

        {success && (
          <div className="mb-4 bg-green-100 text-green-700 p-3 rounded">
            {success}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <Input
            label="First Name*"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            error={errors.firstName}
          />

          <Input
            label="Last Name*"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            error={errors.lastName}
          />

          <Input
            label="Email*"
            name="email"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
          />

          <Input
            label="Password*"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
          />

          <Input
            label="Mobile*"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            error={errors.mobile}
          />

          <Select
            label="Department*"
            name="department"
            value={formData.department}
            onChange={handleChange}
            options={departments}
            error={errors.department}
          />

          <Select
            label="Designation*"
            name="designation"
            value={formData.designation}
            onChange={handleChange}
            options={designations}
            error={errors.designation}
          />

          <Select
            label="Employment Type*"
            name="employmentType"
            value={formData.employmentType}
            onChange={handleChange}
            options={employmentTypes}
            error={errors.employmentType}
          />

          {/* ===== COURSES DROPDOWN (CLICK PE OPEN) ===== */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1">
              Courses Assigned* (Ctrl + Click for multiple)
            </label>

            <select
              multiple
              size={1}   // ⭐ YE LINE PROBLEM FIX KARTI HAI
              value={formData.coursesAssigned}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  coursesAssigned: Array.from(
                    e.target.selectedOptions,
                    (opt) => opt.value
                  ),
                }))
              }
              className={`w-full border px-3 py-2 rounded ${
                errors.coursesAssigned
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
            >
              {courses.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>

            {errors.coursesAssigned && (
              <p className="text-red-500 text-xs mt-1">
                {errors.coursesAssigned}
              </p>
            )}
          </div>

          <Input
            label="Joining Date*"
            type="date"
            name="joiningDate"
            value={formData.joiningDate}
            onChange={handleChange}
            error={errors.joiningDate}
          />

          <div className="md:col-span-2 flex justify-center mt-6">
            <button
              disabled={loading}
              className="bg-[#0b2a44] text-white px-12 py-2 rounded font-semibold"
            >
              {loading ? "Saving..." : "Add Teacher"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

/* ===================== */
/* REUSABLE COMPONENTS  */
/* ===================== */

const Input = ({ label, error, ...props }) => (
  <div>
    <label className="block text-sm font-medium mb-1">{label}</label>
    <input
      {...props}
      className={`w-full border px-3 py-2 rounded outline-none ${
        error ? "border-red-500" : "border-gray-300"
      }`}
    />
    {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
  </div>
);

const Select = ({ label, options, error, ...props }) => (
  <div>
    <label className="block text-sm font-medium mb-1">{label}</label>
    <select
      {...props}
      className={`w-full border px-3 py-2 rounded outline-none ${
        error ? "border-red-500" : "border-gray-300"
      }`}
    >
      <option value="">Select {label}</option>
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
    {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
  </div>
);
