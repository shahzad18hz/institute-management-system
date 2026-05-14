import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Attendance() {
  const [students, setStudents] = useState([]);
  const [date, setDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  // ================= FETCH STUDENTS =================
  const fetchStudents = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/students?date=${date}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setStudents(res.data.students || []);
    } catch (err) {
      console.error(err);
      setStudents([]);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, [date]);

  // ================= MARK P / A =================
  const markAttendance = (id, status) => {
    setStudents((prev) =>
      prev.map((s) =>
        s._id === id ? { ...s, status } : s
      )
    );
  };

  // ================= SUBMIT =================
  const submitAttendance = async () => {
    if (students.length === 0) return;

    setLoading(true);
    try {
      const records = students.map((s) => ({
        studentId: s._id,
        status: s.status,
      }));

      await axios.post(
        "http://localhost:5000/api/attendance/mark",
        { date, records },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("Attendance Submitted ✅");
    } catch (err) {
      alert("Error saving attendance ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* ================= HEADER ================= */}
      <div className="bg-white border rounded-lg px-6 py-4">
        <h2 className="text-lg font-semibold text-[#0b2a44]">
          Attendance Management
        </h2>
        <p className="text-xs text-gray-500">
          Mark daily student attendance
        </p>
      </div>

      {/* ================= MAIN CARD ================= */}
      <div className="bg-white border rounded-lg px-6 py-5">
        {/* CARD HEADER */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-5">
          <h3 className="text-sm font-semibold text-[#0b2a44]">
            Web Development
            <span className="text-xs font-normal text-gray-500 ml-2">
              (Morning Batch)
            </span>
          </h3>

          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="border px-3 py-1.5 rounded text-sm focus:ring-2 focus:ring-[#F8AF2A] outline-none"
          />
        </div>

        {/* ================= TABLE ================= */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-[#0b2a44] text-white">
              <tr>
                <th className="px-4 py-3 text-left font-medium">
                  Roll No
                </th>
                <th className="px-4 py-3 text-left font-medium">
                  Student Name
                </th>
                <th className="px-4 py-3 text-left font-medium">
                  Course
                </th>
                <th className="px-4 py-3 text-center font-medium">
                  Attendance
                </th>
              </tr>
            </thead>

            <tbody>
              {students.length === 0 ? (
                <tr>
                  <td
                    colSpan="4"
                    className="text-center py-6 text-gray-500"
                  >
                    No students found
                  </td>
                </tr>
              ) : (
                students.map((s) => (
                  <tr
                    key={s._id}
                    className="border-b hover:bg-gray-50"
                  >
                    <td className="px-4 py-2">
                      {String(s.rollNumber).padStart(3, "0")}
                    </td>

                    <td className="px-4 py-2 font-medium text-[#0b2a44]">
                      {s.fullname}
                    </td>

                    <td className="px-4 py-2">
                      {s.course}
                    </td>

                    {/* ✅ P / A BUTTONS (NO DESIGN CHANGE) */}
                    <td className="px-4 py-2 text-center">
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() => markAttendance(s._id, "P")}
                          className={`px-3 py-1 rounded text-white font-semibold ${
                            s.status === "P"
                              ? "bg-green-600"
                              : "bg-gray-300 hover:bg-green-500"
                          }`}
                        >
                          P
                        </button>

                        <button
                          onClick={() => markAttendance(s._id, "A")}
                          className={`px-3 py-1 rounded text-white font-semibold ${
                            s.status === "A"
                              ? "bg-red-600"
                              : "bg-gray-300 hover:bg-red-500"
                          }`}
                        >
                          A
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* ================= ACTION BUTTON ================= */}
        <div className="mt-6">
          <button
            onClick={submitAttendance}
            disabled={loading || students.length === 0}
            className="bg-[#0b2a44] hover:bg-[#0b2a44]/90 text-white px-6 py-2 rounded text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Saving..." : "Submit Attendance"}
          </button>
        </div>
      </div>
    </div>
  );
}
