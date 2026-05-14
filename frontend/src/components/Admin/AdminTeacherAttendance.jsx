import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AdminTeacherAttendance() {
  const [teachers, setTeachers] = useState([]);
  const [attendance, setAttendance] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().slice(0, 10)
  );

  const token = localStorage.getItem("token");

  // ================= LOAD TEACHERS =================
  useEffect(() => {
    const loadTeachers = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/teachers", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTeachers(res.data || []);
      } catch (err) {
        setError("Failed to load teachers");
      } finally {
        setLoading(false);
      }
    };
    loadTeachers();
  }, [token]);

  // ================= LOAD ATTENDANCE =================
  useEffect(() => {
    setAttendance({});
    if (!selectedDate) return;

    axios
      .get(
        `http://localhost:5000/api/teacher-attendance?date=${selectedDate}`,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((res) => {
        const map = {};
        res.data.forEach((a) => {
          map[a.teacher._id] = a.status;
        });
        setAttendance(map);
      })
      .catch(() => {});
  }, [selectedDate, token]);

  // ================= MARK =================
  const markAttendance = (id, status) => {
    setAttendance((prev) => ({ ...prev, [id]: status }));
  };

  // ================= SAVE =================
  const saveAttendance = async () => {
    if (Object.keys(attendance).length === 0) {
      alert("Please mark attendance first");
      return;
    }

    try {
      await axios.post(
        "http://localhost:5000/api/teacher-attendance",
        { attendance, date: selectedDate },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Attendance saved ✅");
    } catch (err) {
      alert("Failed to save attendance ❌");
    }
  };

  if (loading) return <p className="p-6">Loading...</p>;
  if (error) return <p className="p-6 text-red-600">{error}</p>;

  return (
    <div className="p-6 space-y-4">

      {/* 🔥 SAME HEADER CARD */}
      <div className="bg-white border rounded-lg px-6 py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-[#0b2a44]">
            Teacher Attendance
          </h2>
          <p className="text-xs text-gray-500">
            Admin can view & update attendance
          </p>
        </div>

        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="border px-3 py-1.5 rounded text-sm"
        />
      </div>

      {/* ================= TABLE ================= */}
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
                <tr
                  key={t._id}
                  className="border-b hover:bg-gray-50"
                >
                  <td className="px-4 py-2 font-medium text-[#0b2a44]">
                    {t.firstName} {t.lastName}
                  </td>
                  <td className="px-4 py-2">{t.email}</td>
                  <td className="px-4 py-2">{t.department || "—"}</td>

                  <td className="px-4 py-2 text-center">
                    <div className="flex justify-center gap-2">
                      <button
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

      {/* ================= SAVE BUTTON ================= */}
      <button
        onClick={saveAttendance}
        className="bg-[#0b2a44] hover:bg-[#0b2a44]/90 text-white px-6 py-2 rounded"
      >
        Save Attendance
      </button>
    </div>
  );
}
