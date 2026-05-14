import React, { useState } from "react";
import Logo from "../../assets/images/logo.png";

import {
  HiOutlineHome,
  HiOutlineUserAdd,
  HiOutlineAcademicCap,
  HiOutlineClipboardCheck,
  HiOutlineCash,
  HiOutlineCalendar,
  HiOutlineBadgeCheck,
  HiOutlineChartBar,
  HiOutlineChevronDown,
  HiOutlineChevronUp,
} from "react-icons/hi";

import { PiStudentDuotone } from "react-icons/pi";
import { RiUserSettingsLine } from "react-icons/ri";
import { FaChalkboardTeacher } from "react-icons/fa";

export const Sidebar = ({ setSection, activeSection, isOpen }) => {
  const [openReceptionist, setOpenReceptionist] = useState(false);
  const [openTeacher, setOpenTeacher] = useState(false);

  const menuItems = [
    { label: "Dashboard", key: "dashboard", icon: <HiOutlineHome /> },
    { label: "Leads", key: "leads", icon: <HiOutlineUserAdd /> },
    { label: "Admissions", key: "admissions", icon: <HiOutlineAcademicCap /> },
    { label: "Attendance", key: "attendance", icon: <HiOutlineClipboardCheck /> },
    { label: "Students", key: "students", icon: <PiStudentDuotone /> },
    { label: "Fee Tracking", key: "feecollection", icon: <HiOutlineCash /> },
    { label: "Class Scheduling", key: "schedule", icon: <HiOutlineCalendar /> },
    { label: "Certificates", key: "certificates", icon: <HiOutlineBadgeCheck /> },
    { label: "Reports", key: "reports", icon: <HiOutlineChartBar /> },
  ];

  return (
    <aside className="fixed lg:relative z-30 top-0 left-0 h-full w-64 bg-[#0b2a44] text-white flex flex-col">
      {/* LOGO */}
      <div className="h-16 flex items-center justify-center border-b border-white/10">
        <img src={Logo} alt="Logo" className="h-9" />
      </div>

      {/* SCROLLABLE MENU */}
      <nav className="flex-1 overflow-y-auto py-3 text-sm">
        {menuItems.map((item) => (
          <React.Fragment key={item.key}>
            <button
              onClick={() => setSection(item.key)}
              className={`w-full flex items-center gap-3 px-6 py-2.5
              ${activeSection === item.key
                  ? "bg-[#0e3a55] border-l-4 border-[#F8AF2A]"
                  : "hover:bg-[#0e3a55]/70"
                }`}
            >
              <span className="text-lg">{item.icon}</span>
              {item.label}
            </button>

            {/* 👩‍💼 Receptionists */}
            {item.key === "feecollection" && (
              <>
                <button
                  onClick={() => setOpenReceptionist(!openReceptionist)}
                  className="w-full flex justify-between items-center px-6 py-2.5 hover:bg-[#0e3a55]/70"
                >
                  <div className="flex gap-3 items-center">
                    <RiUserSettingsLine />
                    Receptionists
                  </div>
                  {openReceptionist ? <HiOutlineChevronUp /> : <HiOutlineChevronDown />}
                </button>

                {openReceptionist && (
                  <div className="bg-[#0e3a55]/60">
                    <button
                      onClick={() => setSection("addReceptionist")}
                      className="w-full text-left px-12 py-2 hover:text-[#F8AF2A]"
                    >
                      Add Receptionist
                    </button>
                    <button
                      onClick={() => setSection("allReceptionists")}
                      className="w-full text-left px-12 py-2 hover:text-[#F8AF2A]"
                    >
                      All Receptionists
                    </button>
                  </div>
                )}

                {/* 👨‍🏫 Teachers */}
                <button
                  onClick={() => setOpenTeacher(!openTeacher)}
                  className="w-full flex justify-between items-center px-6 py-2.5 hover:bg-[#0e3a55]/70"
                >
                  <div className="flex gap-3 items-center">
                    <FaChalkboardTeacher />
                    Teachers
                  </div>
                  {openTeacher ? <HiOutlineChevronUp /> : <HiOutlineChevronDown />}
                </button>

                {openTeacher && (
                  <div className="bg-[#0e3a55]/60">
                    <button
                      onClick={() => setSection("addTeacher")}
                      className="w-full text-left px-12 py-2 hover:text-[#F8AF2A]"
                    >
                      Add Teacher
                    </button>
                    <button
                      onClick={() => setSection("allTeachers")}
                      className="w-full text-left px-12 py-2 hover:text-[#F8AF2A]"
                    >
                      All Teachers
                    </button>
                    <button
                      onClick={() => setSection("teacherAttendance")}
                      className="w-full text-left px-12 py-2 hover:text-[#F8AF2A]"
                    >
                      Teacher Attendance
                    </button>
                  </div>
                )}
              </>
            )}
          </React.Fragment>
        ))}
      </nav>
    </aside>
  );
};
