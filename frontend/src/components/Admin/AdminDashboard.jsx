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

import LeadsList from "../Leads/LeadsList";
import LeadView from "../Leads/LeadView";
import AddLead from "../Leads/AddLead";

import AddTeacher from "./AddTeacher";
import TeacherList from "./TeacherList";
import AdminTeacherAttendance from "./AdminTeacherAttendance"; // ✅ Admin attendance page

export default function AdminDashboard() {
  const [section, setSection] = useState("dashboard");
  const [selectedLeadId, setSelectedLeadId] = useState(null);

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar setSection={setSection} activeSection={section} />

      <div className="flex-1 flex flex-col">
        <Header />

        <div className="p-6 flex-1 overflow-auto">
          {section === "dashboard" && <Dashboard />}

          {section === "leads" && (
            <LeadsList
              setSection={setSection}
              setSelectedLeadId={setSelectedLeadId}
            />
          )}

          {section === "addLead" && <AddLead setSection={setSection} />}

          {section === "viewLead" && selectedLeadId && (
            <LeadView leadId={selectedLeadId} setSection={setSection} />
          )}

          {section === "admissions" && <Admission />}
          {section === "attendance" && <Attendance />}
          {section === "students" && <Student />}
          {section === "feecollection" && <FeeCollection />}

          {/* 👩‍💼 Receptionist */}
          {section === "addReceptionist" && <AddReceptionist />}
          {section === "allReceptionists" && <ReceptionistList />}

          {/* 👨‍🏫 Teacher */}
          {section === "addTeacher" && <AddTeacher />}
          {section === "allTeachers" && <TeacherList />}
          {section === "teacherAttendance" && <AdminTeacherAttendance />} {/* ✅ Admin attendance */}

          {section}
        </div>
      </div>
    </div>
  );
}
