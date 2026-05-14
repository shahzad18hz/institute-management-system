import { useEffect, useState } from "react";
import axios from "axios";

export default function LeadView({ leadId, setSection }) {
  const [lead, setLead] = useState(null);
  const [status, setStatus] = useState("");
  const [follow, setFollow] = useState({ method: "call", note: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  // 🔹 Fetch lead details
  useEffect(() => {
    if (!leadId) return;

    const fetchLead = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/leads/${leadId}`);
        setLead(res.data);
        setStatus(res.data.status);
      } catch (err) {
        setError("Failed to load lead details.");
      }
    };

    fetchLead();
  }, [leadId]);

  // 🔹 Update lead status
  const updateStatus = async () => {
    if (!status) return;
    setLoading(true);
    setMessage("");
    setError("");

    try {
      const res = await axios.patch(`http://localhost:5000/api/leads/${leadId}/status`, {
        status,
      });
      setLead(res.data);
      setMessage("Status updated successfully!");
    } catch (err) {
      setError("Failed to update status.");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Convert to student
  const convertToStudent = async () => {
    setLoading(true);
    setMessage("");
    setError("");

    try {
      const res = await axios.patch(`http://localhost:5000/api/leads/${leadId}/status`, {
        status: "admitted",
      });
      setLead(res.data);
      setStatus(res.data.status);
      setMessage("Lead converted to student!");
    } catch (err) {
      setError("Failed to convert lead.");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Add follow-up
  const addFollowUp = async () => {
    if (!follow.note.trim()) return;

    setLoading(true);
    setMessage("");
    setError("");

    try {
      const res = await axios.post(`http://localhost:5000/api/leads/${leadId}/followup`, follow);
      setLead(res.data);
      setFollow({ method: "call", note: "" });
      setMessage("Follow-up added successfully!");
    } catch (err) {
      setError("Failed to add follow-up.");
    } finally {
      setLoading(false);
    }
  };

  if (!lead) return <p className="p-6">Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex justify-center">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow p-6 space-y-6">

        {/* HEADER */}
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold text-[#0b2a44]">Lead Details</h2>
          <button
            onClick={() => setSection("leads")}
            className="text-sm text-blue-600 underline"
          >
            ← Back to Leads
          </button>
        </div>

        {/* MESSAGE / ERROR */}
        {message && <div className="bg-green-100 text-green-700 px-4 py-2 rounded">{message}</div>}
        {error && <div className="bg-red-100 text-red-700 px-4 py-2 rounded">{error}</div>}

        {/* BASIC INFO */}
        <div className="grid grid-cols-2 gap-4 border p-4 rounded bg-gray-50">
          <p><b>Name:</b> {lead.name}</p>
          <p><b>Phone:</b> {lead.phone}</p>
          <p><b>Course:</b> {lead.course}</p>
          <p><b>Source:</b> {lead.source}</p>
          <p><b>Status:</b> {lead.status}</p>
          <p><b>Created:</b> {new Date(lead.createdAt).toLocaleDateString()}</p>
        </div>

        {/* STATUS UPDATE */}
        <div className="flex items-end gap-3">
          <div>
            <label className="text-sm block mb-1">Lead Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="border p-2 rounded w-48 focus:ring-2 focus:ring-yellow-400 outline-none"
            >
              <option value="new">New</option>
              <option value="cold">Cold</option>
              <option value="warm">Warm</option>
              <option value="hot">Hot</option>
              <option value="admitted">Admitted</option>
              <option value="not_interested">Not Interested</option>
            </select>
          </div>
          <button
            onClick={updateStatus}
            disabled={loading}
            className="bg-yellow-400 text-black px-4 py-2 rounded font-semibold hover:bg-yellow-500 transition"
          >
            Update Status
          </button>
        </div>

        {/* FOLLOW UPS */}
        <div className="space-y-2">
          <h3 className="font-semibold">Follow-ups</h3>
          {lead.followUps.length === 0 && <p className="text-gray-500">No follow-ups yet</p>}
          {lead.followUps.map((f, i) => (
            <div key={i} className="border p-2 rounded bg-gray-50 flex justify-between">
              <span><b className="capitalize">{f.method}</b>: {f.note}</span>
              <span className="text-xs text-gray-400">{new Date(f.date).toLocaleDateString()}</span>
            </div>
          ))}
        </div>

        {/* ADD FOLLOW-UP */}
        <div className="border p-4 rounded space-y-3 bg-gray-50">
          <select
            className="border p-2 rounded w-full focus:ring-2 focus:ring-yellow-400 outline-none"
            value={follow.method}
            onChange={(e) => setFollow({ ...follow, method: e.target.value })}
          >
            <option value="call">Call</option>
            <option value="message">Message</option>
            <option value="reminder">Reminder</option>
          </select>
          <input
            className="border p-2 rounded w-full focus:ring-2 focus:ring-yellow-400 outline-none"
            placeholder="Follow-up note"
            value={follow.note}
            onChange={(e) => setFollow({ ...follow, note: e.target.value })}
          />
          <button
            onClick={addFollowUp}
            disabled={loading}
            className="bg-[#0e3a55] text-white px-4 py-2 rounded w-full hover:bg-[#0b2a44] transition"
          >
            Add Follow-up
          </button>
        </div>

        {/* CONVERT TO STUDENT */}
        <button
          onClick={convertToStudent}
          disabled={loading}
          className="bg-green-600 text-white px-4 py-2 rounded w-full hover:bg-green-700 transition"
        >
          Convert to Student
        </button>

      </div>
    </div>
  );
}
