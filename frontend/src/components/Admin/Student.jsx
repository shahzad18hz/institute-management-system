import React, { useEffect, useState } from "react";

export default function Student() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch("http://localhost:5000/api/students", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Unauthorized or API Error");
        return res.json();
      })
      .then((data) => {
        setStudents(data.students || []);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const handleViewDetails = (student) => {
    alert(
      `Student Details\n\nName: ${student.fullname}\nRoll No: ${student.rollNumber}\nCourse: ${student.course}\nBatch: ${student.batch}`
    );
  };

  if (loading)
    return (
      <div className="p-10 text-center text-sm text-[#0b2a44]">
        Loading students...
      </div>
    );

  if (error)
    return (
      <div className="p-10 text-center text-sm text-red-600">
        {error}
      </div>
    );

  return (
    <div className="space-y-4">
      {/* ================= HEADER ================= */}
      <div className="bg-white border rounded-lg px-6 py-4">
        <h2 className="text-lg font-semibold text-[#0b2a44]">
          Students
        </h2>
        <p className="text-xs text-gray-500">
          Total Students: {students.length}
        </p>
      </div>

      {/* ================= TABLE ================= */}
      <div className="bg-white border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-[#0b2a44] text-white sticky top-0">
              <tr>
                <th className="px-4 py-3 text-left font-medium">
                  Roll No
                </th>
                <th className="px-4 py-3 text-left font-medium">
                  Full Name
                </th>
                <th className="px-4 py-3 text-left font-medium">
                  Course
                </th>
                <th className="px-4 py-3 text-left font-medium">
                  Batch
                </th>
                <th className="px-4 py-3 text-center font-medium">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {students.length === 0 ? (
                <tr>
                  <td
                    colSpan="5"
                    className="px-4 py-6 text-center text-gray-500"
                  >
                    No students found
                  </td>
                </tr>
              ) : (
                students.map((student) => (
                  <tr
                    key={student._id}
                    className="border-b hover:bg-gray-50"
                  >
                    <td className="px-4 py-2">
                      {student.rollNumber}
                    </td>

                    <td className="px-4 py-2 font-medium text-[#0b2a44]">
                      {student.fullname}
                    </td>

                    <td className="px-4 py-2">
                      {student.course}
                    </td>

                    <td className="px-4 py-2">
                      {student.batch}
                    </td>

                    <td className="px-4 py-2 text-center">
                      <button
                        onClick={() =>
                          handleViewDetails(student)
                        }
                        className="text-xs font-semibold text-[#0b2a44] underline hover:text-[#F8AF2A]"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
