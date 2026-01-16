import { useEffect, useState } from "react";
import axios from "axios";

export default function ReceptionistList() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  // =========================
  // FETCH ALL RECEPTIONISTS
  // =========================
  const fetchReceptionists = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/receptionists",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setList(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to load receptionists");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReceptionists();
  }, []);

  // =========================
  // TOGGLE ACTIVE
  // =========================
  const toggleStatus = async (id, currentStatus) => {
    try {
      await axios.put(
        `http://localhost:5000/api/receptionists/${id}/status`,
        { isActive: !currentStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchReceptionists();
    } catch (err) {
      console.error(err);
      alert("Status update failed");
    }
  };

  // =========================
  // DELETE
  // =========================
  const deleteReceptionist = async (id) => {
    if (!window.confirm("Are you sure?")) return;

    try {
      await axios.delete(
        `http://localhost:5000/api/receptionists/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchReceptionists();
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  };

  if (loading) return <p>Loading receptionists...</p>;

  return (
    <div className="p-6 bg-white rounded-xl shadow">
      <h2 className="text-xl font-bold mb-4">
        Receptionists (Admin)
      </h2>

      <table className="w-full border border-gray-300 text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">Name</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>

        <tbody>
          {list.length === 0 ? (
            <tr>
              <td colSpan="4" className="p-4 text-center">
                No receptionists found
              </td>
            </tr>
          ) : (
            list.map((r) => (
              <tr key={r._id} className="text-center">
                <td className="border p-2">{r.name}</td>
                <td className="border p-2">{r.email}</td>

                <td
                  className={`border p-2 font-semibold ${
                    r.isActive
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {r.isActive ? "Active" : "Inactive"}
                </td>

                <td className="border p-2 space-x-2">
                  <button
                    onClick={() =>
                      toggleStatus(r._id, r.isActive)
                    }
                    className={`px-3 py-1 rounded text-white ${
                      r.isActive
                        ? "bg-yellow-500"
                        : "bg-green-600"
                    }`}
                  >
                    {r.isActive ? "Deactivate" : "Activate"}
                  </button>

                  <button
                    onClick={() =>
                      deleteReceptionist(r._id)
                    }
                    className="bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
