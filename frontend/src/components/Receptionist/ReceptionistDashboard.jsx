import React, { useState } from "react";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import Dashboard from "./Dashboard";


export default function ReceptionistDashboard() {
  const [section, setSection] = useState("dashboard");

  return (
    <div className="flex h-screen">
      <Sidebar setSection={setSection} activeSection={section} />

      <div className="flex-1 flex flex-col">
        <Header />
        <div className="p-6 flex-1 overflow-auto">
          {section === "dashboard" && <Dashboard />}
          {/* {section === "appointments" && <Appointments />} */}
          {/* {section === "students" && <Students />} */}
          {/* {section === "feecollection" && <FeeCollection />} */}
        </div>
      </div>
    </div>
  );
}
