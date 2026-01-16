import React, { useEffect, useState } from "react";
import {
  HiUserGroup,
  HiCurrencyRupee,
  HiCalendar,
  HiUserAdd
} from "react-icons/hi";

export default function Dashboard() {
  const [studentsCount, setStudentsCount] = useState(0);
  const [pendingFees, setPendingFees] = useState(0);
  const [classesToday, setClassesToday] = useState(0);
  const [newLeads, setNewLeads] = useState(0);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetch("http://localhost:5000/api/students", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        const studentsArray = Array.isArray(data) ? data : data.students || [];
        setStudentsCount(studentsArray.length);
      })
      .catch(() => setError("Failed to load students"));

    fetch("http://localhost:5000/api/fees", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setPendingFees(data.pending || 0))
      .catch(() => setError("Failed to load fees"));

    fetch("http://localhost:5000/api/classes/today", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setClassesToday(data.count || 0))
      .catch(() => setError("Failed to load classes"));

    fetch("http://localhost:5000/api/leads?lastWeek=true", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        const leadsArray = Array.isArray(data) ? data : data.leads || [];
        setNewLeads(leadsArray.length);
      })
      .catch(() => setError("Failed to load leads"));
  }, [token]);

  const cards = [
    {
      title: "Active Students",
      value: studentsCount,
      icon: <HiUserGroup />,
      color: "#0b2a44",
      description: "+12% from last month",
      descColor: "#F8AF2A"
    },
    {
      title: "Pending Fees",
      value: pendingFees,
      icon: <HiCurrencyRupee />,
      color: "#0b2a44",
      description: "-5% from last month",
      descColor: "#F8AF2A"
    },
    {
      title: "Classes Today",
      value: classesToday,
      icon: <HiCalendar />,
      color: "#0b2a44",
      description: "Ongoing today",
      descColor: "#F8AF2A"
    },
    {
      title: "New Leads",
      value: newLeads,
      icon: <HiUserAdd />,
      color: "#0b2a44",
      description: "+8% this week",
      descColor: "#F8AF2A"
    },
  ];

  return (
    <div className="space-y-6 p-6 bg-gray-100 min-h-screen">
      {error && <p className="text-red-500 font-semibold">{error}</p>}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {cards.map((card, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-lg p-5 flex items-center justify-between transition hover:shadow-2xl"
          >
            <div>
              <p className="text-sm font-medium text-[#0b2a44]">{card.title}</p>
              <h3 className="text-2xl font-bold text-[#0b2a44]">{card.value}</h3>
              <p className="text-sm font-semibold" style={{ color: card.descColor }}>
                {card.description}
              </p>
            </div>
            <div
              className="text-white text-4xl p-3 rounded-md"
              style={{ backgroundColor: card.color }}
            >
              {card.icon}
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-lg p-5">
        <h3 className="text-lg font-semibold text-[#0b2a44] mb-4">Recent Activity</h3>
        <ul className="space-y-2 text-sm text-gray-700">
          <li>✔ New lead added last week</li>
          <li>✔ Fee received from students</li>
          <li>✔ Attendance updated for today</li>
          <li>✔ Certificates generated</li>
        </ul>
      </div>
    </div>
  );
}
