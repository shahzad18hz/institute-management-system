import { useEffect, useState } from "react";
import axios from "axios";

export default function FeeCollection() {
  const [fees, setFees] = useState([]);
  const [openRow, setOpenRow] = useState(null);
  const [activePayRow, setActivePayRow] = useState(null);
  const [amounts, setAmounts] = useState({});
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  const fetchFees = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/fees", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFees(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFees();
  }, []);

  const payFee = async (studentId, totalFee, paidAmount) => {
    const amount = Number(amounts[studentId]);
    const remaining = totalFee - paidAmount;

    if (!amount || amount <= 0) return alert("Enter valid amount");
    if (amount > remaining)
      return alert(`Amount exceeds remaining Rs ${remaining}`);

    try {
      await axios.post(
        "http://localhost:5000/api/fees/pay",
        { studentId, amount },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setActivePayRow(null);
      setAmounts({});
      fetchFees();
    } catch {
      alert("Payment failed");
    }
  };

  if (loading)
    return (
      <div className="p-10 text-center text-[#0b2a44] text-sm">
        Loading fee records...
      </div>
    );

  return (
    <div className="bg-white rounded-lg shadow border border-gray-200">
      {/* HEADER */}
      <div className="px-6 py-4 border-b">
        <h2 className="text-lg font-semibold text-[#0b2a44]">
          Fee Collection
        </h2>
        <p className="text-xs text-gray-500">
          Student payment management
        </p>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-[#0b2a44] text-white sticky top-0">
            <tr>
              <th className="px-4 py-3 text-left">Roll</th>
              <th className="px-4 py-3 text-left">Student</th>
              <th className="px-4 py-3 text-left">Course</th>
              <th className="px-4 py-3 text-right">Total</th>
              <th className="px-4 py-3 text-right">Paid</th>
              <th className="px-4 py-3 text-right">Due</th>
              <th className="px-4 py-3 text-center">Status</th>
              <th className="px-4 py-3 text-center">Action</th>
              <th className="px-4 py-3 text-center">History</th>
            </tr>
          </thead>

          <tbody>
            {fees.map((fee) => {
              const remaining = fee.totalFee - fee.paidAmount;

              return (
                <>
                  {/* MAIN ROW */}
                  <tr
                    key={fee._id}
                    className="border-b hover:bg-gray-50"
                  >
                    <td className="px-4 py-3">
                      {fee.student.rollNumber}
                    </td>

                    <td className="px-4 py-3 font-medium text-[#0b2a44]">
                      {fee.student.fullname}
                    </td>

                    <td className="px-4 py-3">
                      {fee.student.course}
                    </td>

                    <td className="px-4 py-3 text-right">
                      Rs {fee.totalFee}
                    </td>

                    <td className="px-4 py-3 text-right text-green-700">
                      Rs {fee.paidAmount}
                    </td>

                    <td className="px-4 py-3 text-right text-red-600">
                      Rs {remaining}
                    </td>

                    {/* STATUS */}
                    <td className="px-4 py-3 text-center">
                      <span
                        className={`inline-block min-w-[70px] px-2 py-1 rounded text-xs font-semibold
                        ${
                          fee.status === "Paid"
                            ? "bg-green-100 text-green-700"
                            : fee.status === "Partial"
                            ? "bg-[#F8AF2A]/20 text-[#0b2a44]"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {fee.status}
                      </span>
                    </td>

                    {/* ACTION */}
                    <td className="px-4 py-3 text-center">
                      {fee.status !== "Paid" && (
                        <button
                          onClick={() =>
                            setActivePayRow(
                              activePayRow === fee.student._id
                                ? null
                                : fee.student._id
                            )
                          }
                          className="bg-[#F8AF2A] text-[#0b2a44] px-3 py-1 rounded text-xs font-semibold hover:opacity-90"
                        >
                          Collect
                        </button>
                      )}
                    </td>

                    {/* HISTORY */}
                    <td className="px-4 py-3 text-center">
                      <button
                        onClick={() =>
                          setOpenRow(openRow === fee._id ? null : fee._id)
                        }
                        className="text-[#0b2a44] text-xs underline"
                      >
                        View
                      </button>
                    </td>
                  </tr>

                  {/* PAYMENT ROW */}
                  {activePayRow === fee.student._id && (
                    <tr className="bg-gray-50">
                      <td colSpan="9" className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <span className="text-xs text-gray-600">
                            Remaining: Rs {remaining}
                          </span>

                          <input
                            type="number"
                            max={remaining}
                            className="border px-3 py-1 rounded text-sm w-40 focus:ring-2 focus:ring-[#F8AF2A] outline-none"
                            placeholder="Enter amount"
                            value={amounts[fee.student._id] || ""}
                            onChange={(e) =>
                              setAmounts({
                                ...amounts,
                                [fee.student._id]: e.target.value,
                              })
                            }
                          />

                          <button
                            onClick={() =>
                              payFee(
                                fee.student._id,
                                fee.totalFee,
                                fee.paidAmount
                              )
                            }
                            className="bg-[#0b2a44] text-white px-4 py-1 rounded text-xs"
                          >
                            Confirm
                          </button>

                          <button
                            onClick={() => setActivePayRow(null)}
                            className="text-xs text-gray-600"
                          >
                            Cancel
                          </button>
                        </div>
                      </td>
                    </tr>
                  )}

                  {/* HISTORY ROW */}
                  {openRow === fee._id && (
                    <tr className="bg-gray-50">
                      <td colSpan="9" className="px-6 py-4">
                        {fee.history.length === 0 ? (
                          <p className="text-xs text-gray-500 text-center">
                            No payment history
                          </p>
                        ) : (
                          <table className="w-full text-xs border">
                            <thead className="bg-gray-100">
                              <tr>
                                <th className="border px-2 py-1">
                                  Amount
                                </th>
                                <th className="border px-2 py-1">
                                  Date
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {fee.history.map((h) => (
                                <tr key={h._id} className="text-center">
                                  <td className="border px-2 py-1">
                                    Rs {h.amount}
                                  </td>
                                  <td className="border px-2 py-1">
                                    {new Date(
                                      h.date
                                    ).toLocaleString()}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        )}
                      </td>
                    </tr>
                  )}
                </>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
