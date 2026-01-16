import React, { useState } from "react";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import Dashboard from "./Dashboard";
import Admission from "./Admission";
import Attendance from "./Attendance";
import Student from "./Student";
import FeeCollection from "./FeeCollection";
import AddReceptionist from "./AddReceptionist";
import ReceptionistList from "./ReceptionistList";



export default function AdminDashboard() {
  const [section, setSection] = useState("dashboard");

  return (
    <div className="flex h-screen">
      <Sidebar setSection={setSection} />
      <div className="flex-1 flex flex-col">
        <Header />
        <div className="p-6 flex-1 overflow-auto">
          {section === "dashboard" && <Dashboard />}
          {section === "admissions" && <Admission />}
          {section === "attendance" && <Attendance />}
          {section === "students" && <Student />}
          {section === "feecollection" && <FeeCollection />}
          {section === "addReceptionist" &&<AddReceptionist />}
          {section === "allReceptionists" && <ReceptionistList />}
        </div>
      </div>
    </div>
  );
}
