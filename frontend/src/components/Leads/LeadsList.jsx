import { useEffect, useState } from "react";
import axios from "axios";

export default function LeadsList({ setSection, setSelectedLeadId }) {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/leads")
      .then((res) => setLeads(res.data))
      .catch(() => alert("Error loading leads"))
      .finally(() => setLoading(false));
  }, []);

  const statusColor = (status) => {
    switch (status) {
      case "hot":
        return "bg-red-100 text-red-700";
      case "warm":
        return "bg-yellow-100 text-yellow-700";
      case "cold":
        return "bg-blue-100 text-blue-700";
      case "admitted":
        return "bg-green-100 text-green-700";
      case "not_interested":
        return "bg-gray-200 text-gray-700";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  if (loading) return <p>Loading leads...</p>;

  return (
    <div className="bg-white rounded-xl shadow p-4">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold text-[#0b2a44]">
          Leads Management
        </h2>

        {/* ADD LEAD BUTTON */}
        <button
          onClick={() => setSection("addLead")}
          className="bg-[#F8AF2A] text-black px-4 py-2 rounded-md font-semibold hover:opacity-90"
        >
          + Add Lead
        </button>
      </div>

      {/* TABLE */}
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="bg-gray-100 text-gray-700">
            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-left">Phone</th>
            <th className="p-3 text-left">Course</th>
            <th className="p-3 text-left">Source</th>
            <th className="p-3 text-left">Status</th>
            <th className="p-3 text-left">Date</th>
            <th className="p-3 text-center">Action</th>
          </tr>
        </thead>

        <tbody>
          {leads.map((l) => (
            <tr
              key={l._id}
              className="border-b hover:bg-gray-50 transition"
            >
              <td className="p-3 font-medium">{l.name}</td>
              <td className="p-3">{l.phone}</td>
              <td className="p-3">{l.course}</td>
              <td className="p-3">{l.source}</td>

              <td className="p-3">
                <span
                  className={`px-2 py-1 rounded text-xs font-semibold ${statusColor(
                    l.status
                  )}`}
                >
                  {l.status.replace("_", " ")}
                </span>
              </td>

              <td className="p-3">
                {new Date(l.createdAt).toLocaleDateString()}
              </td>

              <td className="p-3 text-center">
                <button
                  onClick={() => {
                    setSelectedLeadId(l._id);
                    setSection("viewLead");
                  }}
                  className="text-[#F8AF2A] font-semibold hover:underline"
                >
                  View
                </button>
              </td>
            </tr>
          ))}

          {leads.length === 0 && (
            <tr>
              <td
                colSpan="7"
                className="text-center p-6 text-gray-500"
              >
                No leads found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
