import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function LeadsList() {
  const [leads, setLeads] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/leads")
      .then((res) => setLeads(res.data))
      .catch(() => alert("Error loading leads"));
  }, []);

  return (
    <table className="w-full border">
      <thead className="bg-gray-200">
        <tr>
          <th>Name</th>
          <th>Phone</th>
          <th>Course</th>
          <th>Source</th>
          <th>Status</th>
          <th>Date</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {leads.map((l) => (
          <tr key={l._id} className="border-t">
            <td>{l.name}</td>
            <td>{l.phone}</td>
            <td>{l.course}</td>
            <td>{l.source}</td>
            <td>{l.status}</td>
            <td>{new Date(l.createdAt).toLocaleDateString()}</td>
            <td>
              <Link to={`/leads/${l._id}`} className="text-blue-600">
                View
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
