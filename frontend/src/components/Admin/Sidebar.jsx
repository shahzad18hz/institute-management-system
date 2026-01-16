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

export const Sidebar = ({
  setSection,
  handleLogout,
  isOpen,
  activeSection,
}) => {
  const [openReceptionist, setOpenReceptionist] = useState(false);

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
    <aside
      className={`fixed lg:relative z-30 top-0 left-0 h-full w-64 bg-[#0b2a44] text-white transform transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
    >
      {/* LOGO */}
      <div className="h-16 flex items-center justify-center border-b border-white/10">
        <img src={Logo} alt="Logo" className="h-9 object-contain" />
      </div>

      {/* MENU */}
      <nav className="py-3 text-sm">
        {menuItems.map((item, index) => (
          <React.Fragment key={item.key}>
            <button
              onClick={() => setSection(item.key)}
              className={`w-full flex items-center gap-3 px-6 py-2.5 transition-all
          ${activeSection === item.key
                  ? "bg-[#0e3a55] border-l-4 border-[#F8AF2A]"
                  : "hover:bg-[#0e3a55]/70"
                }`}
            >
              <span className="text-lg">{item.icon}</span>
              <span className="font-medium">{item.label}</span>
            </button>

            {/* 👇 Fee Tracking ke baad Receptionists */}
            {item.key === "feecollection" && (
              <div className="mt-2">
                <button
                  onClick={() => setOpenReceptionist(!openReceptionist)}
                  className={`w-full flex items-center justify-between px-6 py-2.5 transition-all
              ${openReceptionist
                      ? "bg-[#0e3a55]"
                      : "hover:bg-[#0e3a55]/70"
                    }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-lg">
                      <RiUserSettingsLine />
                    </span>
                    <span className="font-medium">Receptionists</span>
                  </div>
                  {openReceptionist ? (
                    <HiOutlineChevronUp />
                  ) : (
                    <HiOutlineChevronDown />
                  )}
                </button>

                {openReceptionist && (
                  <div className="bg-[#0e3a55]/60">
                    <button
                      onClick={() => setSection("addReceptionist")}
                      className={`w-full text-left px-12 py-2 transition
                  ${activeSection === "addReceptionist"
                          ? "text-[#F8AF2A]"
                          : "hover:text-[#F8AF2A]"
                        }`}
                    >
                      Add Receptionist
                    </button>

                    <button
                      onClick={() => setSection("allReceptionists")}
                      className={`w-full text-left px-12 py-2 transition
                  ${activeSection === "allReceptionists"
                          ? "text-[#F8AF2A]"
                          : "hover:text-[#F8AF2A]"
                        }`}
                    >
                      All Receptionists
                    </button>
                  </div>
                )}
              </div>
            )}
          </React.Fragment>
        ))}
      </nav>

    </aside>
  );
};
