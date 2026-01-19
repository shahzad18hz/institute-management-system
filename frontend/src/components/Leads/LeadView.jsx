import { useEffect, useState } from "react";
import axios from "axios";

export default function LeadView({ leadId }) {
  const [lead, setLead] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [follow, setFollow] = useState({ method: "call", note: "" });

  const token = localStorage.getItem("token");

  const axiosConfig = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };

  // 🔹 GET SINGLE LEAD
  useEffect(() => {
    if (!leadId) return;

    const fetchLead = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `http://localhost:5000/api/leads/${leadId}`,
          axiosConfig
        );
        setLead(res.data);
      } catch (err) {
        setError("Failed to load lead");
      } finally {
        setLoading(false);
      }
    };

    fetchLead();
  }, [leadId]);

  // 🔹 CHANGE STATUS
  const changeStatus = async (status) => {
    try {
      const res = await axios.patch(
        `http://localhost:5000/api/leads/${leadId}/status`,
        { status },
        axiosConfig
      );
      setLead(res.data);
    } catch (err) {
      alert("Status update failed");
    }
  };

  // 🔹 ADD FOLLOW-UP
  const addFollowUp = async () => {
    if (!follow.note.trim()) return;

    try {
      const res = await axios.post(
        `http://localhost:5000/api/leads/${leadId}/followup`,
        follow,
        axiosConfig
      );
      setLead(res.data);
      setFollow({ method: "call", note: "" });
    } catch (err) {
      alert("Follow-up failed");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!lead) return null;

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-xl font-bold">{lead.name}</h2>
      <p>
        {lead.phone} | {lead.course}
      </p>

      <select
        value={lead.status}
        onChange={(e) => changeStatus(e.target.value)}
        className="input w-48"
      >
        <option value="cold">Cold</option>
        <option value="warm">Warm</option>
        <option value="hot">Hot</option>
        <option value="admitted">Admitted</option>
        <option value="not_interested">Not Interested</option>
      </select>

      <h3 className="font-semibold">Follow Ups</h3>

      {Array.isArray(lead.followUps) && lead.followUps.length > 0 ? (
        lead.followUps.map((f, i) => (
          <div key={i} className="border p-2">
            {f.method} — {f.note}
          </div>
        ))
      ) : (
        <p className="text-gray-500">No follow-ups yet</p>
      )}

      <div className="space-y-2">
        <select
          className="input"
          value={follow.method}
          onChange={(e) =>
            setFollow({ ...follow, method: e.target.value })
          }
        >
          <option value="call">Call</option>
          <option value="message">Message</option>
          <option value="reminder">Reminder</option>
        </select>

        <input
          className="input"
          placeholder="Note"
          value={follow.note}
          onChange={(e) =>
            setFollow({ ...follow, note: e.target.value })
          }
        />

        <button className="btn" onClick={addFollowUp}>
          Add Follow-up
        </button>
      </div>

      <button
        className="btn bg-green-600 text-white"
        onClick={() => changeStatus("admitted")}
      >
        Convert to Student
      </button>
    </div>
  );
}
