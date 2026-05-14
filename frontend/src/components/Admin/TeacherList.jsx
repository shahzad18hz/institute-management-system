import React, { useEffect, useState } from "react";
import axios from "axios";

export default function TeacherList() {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedTeacher, setSelectedTeacher] = useState(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const loadTeachers = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/teachers", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const list = Array.isArray(res.data) ? res.data : [];
        setTeachers(list);
      } catch (err) {
        console.error(err);
        setError("Failed to load teachers");
        setTeachers([]);
      } finally {
        setLoading(false);
      }
    };

    loadTeachers();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this teacher?")) return;

    try {
      await axios.delete(`http://localhost:5000/api/teachers/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTeachers((prev) => prev.filter((t) => t._id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete teacher");
    }
  };

  const handleViewProfile = (teacher) => {
    setSelectedTeacher(teacher);
  };

  if (loading) return <p className="p-6 text-gray-500">Loading...</p>;
  if (error) return <p className="p-6 text-red-600">{error}</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">All Teachers</h2>

      {teachers.length === 0 ? (
        <p className="text-gray-500">No teachers found</p>
      ) : (
        <div className="overflow-x-auto shadow-lg rounded-lg">
          <table className="w-full border-collapse text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-left font-medium text-gray-700">Name</th>
                <th className="p-3 text-left font-medium text-gray-700">Email</th>
                <th className="p-3 text-left font-medium text-gray-700">Department</th>
                <th className="p-3 text-left font-medium text-gray-700">Courses</th>
                <th className="p-3 text-left font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {teachers.map((t, idx) => (
                <tr
                  key={t._id}
                  className={`border-b hover:bg-gray-50 ${idx % 2 === 0 ? "bg-white" : "bg-gray-50"}`}
                >
                  <td className="p-3 font-medium text-gray-800">{t.firstName} {t.lastName}</td>
                  <td className="p-3 text-gray-600">{t.email}</td>
                  <td className="p-3 text-gray-600">{t.department || "—"}</td>
                  <td className="p-3 text-gray-600">
                    {Array.isArray(t.coursesAssigned) && t.coursesAssigned.length > 0
                      ? t.coursesAssigned.join(", ")
                      : "—"}
                  </td>
                  <td className="p-3 flex space-x-2">
                    <button
                      onClick={() => handleViewProfile(t)}
                      className="px-4 py-1 bg-blue-500 text-white rounded-xl shadow hover:bg-blue-600 transition"
                    >
                      View
                    </button>
                    <button
                      onClick={() => handleDelete(t._id)}
                      className="px-4 py-1 bg-red-500 text-white rounded-xl shadow hover:bg-red-600 transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Profile Modal */}
      {selectedTeacher && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white p-6 rounded-2xl shadow-xl w-96 relative animate-fadeIn">
            <h3 className="text-xl font-bold mb-4 text-gray-800">
              {selectedTeacher.firstName} {selectedTeacher.lastName}
            </h3>
            <div className="space-y-2 text-gray-700">
              <p><strong>Email:</strong> {selectedTeacher.email}</p>
              <p><strong>Department:</strong> {selectedTeacher.department || "—"}</p>
              <p><strong>Designation:</strong> {selectedTeacher.designation || "—"}</p>
              <p><strong>Mobile:</strong> {selectedTeacher.mobile || "—"}</p>
              <p><strong>Courses:</strong> {selectedTeacher.coursesAssigned.length > 0 ? selectedTeacher.coursesAssigned.join(", ") : "—"}</p>
            </div>
            <button
              onClick={() => setSelectedTeacher(null)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 font-bold text-lg"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
