import React, { useEffect, useState } from "react";
import axios from "axios";

export default function TeacherAttendance() {
  const [teachers, setTeachers] = useState([]);
  const [attendance, setAttendance] = useState({});
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [locked, setLocked] = useState(false);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role"); // admin | receptionist

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/teachers", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setTeachers(res.data || []))
      .finally(() => setLoading(false));
  }, [token]);

  useEffect(() => {
    setAttendance({});
    setLocked(false);

    axios
      .get(
        `http://localhost:5000/api/teacher-attendance?date=${selectedDate}`,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((res) => {
        if (res.data.length) {
          const map = {};
          res.data.forEach((a) => (map[a.teacher._id] = a.status));
          setAttendance(map);
          if (role === "receptionist") setLocked(true);
        }
      })
      .catch(() => {});
  }, [selectedDate, role, token]);

  const markAttendance = (id, status) => {
    if (locked) return;
    setAttendance((p) => ({ ...p, [id]: status }));
  };

  const saveAttendance = async () => {
    await axios.post(
      "http://localhost:5000/api/teacher-attendance",
      { date: selectedDate, attendance },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    if (role === "receptionist") setLocked(true);
    alert("Attendance saved ✅");
  };

  if (loading) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6 space-y-4">

      {/* 🔥 SINGLE CLEAN HEADER */}
      <div className="bg-white border rounded-lg px-6 py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-[#0b2a44]">
            Teacher Attendance
          </h2>
          <p className="text-xs text-gray-500">
            {role === "admin"
              ? "Admin can update attendance"
              : "Receptionist can mark attendance once"}
          </p>
        </div>

        <input
          type="date"
          value={selectedDate}
          disabled={locked}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="border px-3 py-1.5 rounded text-sm w-fit"
        />
      </div>

      {locked && role === "receptionist" && (
        <p className="text-red-600 font-medium">
          Attendance locked. Contact admin to update.
        </p>
      )}

      {/* TABLE */}
      <div className="bg-white border rounded-lg overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-[#0b2a44] text-white">
            <tr>
              <th className="px-4 py-3 text-left">Name</th>
              <th className="px-4 py-3 text-left">Email</th>
              <th className="px-4 py-3 text-left">Department</th>
              <th className="px-4 py-3 text-center">Attendance</th>
            </tr>
          </thead>
          <tbody>
            {teachers.map((t) => {
              const status = attendance[t._id];
              return (
                <tr key={t._id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-2 font-medium">
                    {t.firstName} {t.lastName}
                  </td>
                  <td className="px-4 py-2">{t.email}</td>
                  <td className="px-4 py-2">{t.department || "—"}</td>
                  <td className="px-4 py-2 text-center">
                    <div className="flex justify-center gap-2">
                      <button
                        disabled={locked}
                        onClick={() => markAttendance(t._id, "P")}
                        className={`px-3 py-1 rounded text-white font-semibold ${
                          status === "P"
                            ? "bg-green-600"
                            : "bg-gray-300 hover:bg-green-500"
                        }`}
                      >
                        P
                      </button>
                      <button
                        disabled={locked}
                        onClick={() => markAttendance(t._id, "A")}
                        className={`px-3 py-1 rounded text-white font-semibold ${
                          status === "A"
                            ? "bg-red-600"
                            : "bg-gray-300 hover:bg-red-500"
                        }`}
                      >
                        A
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {!locked && (
        <button
          onClick={saveAttendance}
          className="bg-[#0b2a44] text-white px-6 py-2 rounded"
        >
          Save Attendance
        </button>
      )}
    </div>
  );
}
