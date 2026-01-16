import React from "react";
import Logo from "../../assets/images/logo.png";
import {
  HiOutlineHome,
  HiOutlineCalendar,
  HiOutlineCash,
} from "react-icons/hi";
import { PiStudentDuotone } from "react-icons/pi";

export const Sidebar = ({ setSection, activeSection }) => {
  const menuItems = [
    { label: "Dashboard", key: "dashboard", icon: <HiOutlineHome /> },
    { label: "Appointments", key: "appointments", icon: <HiOutlineCalendar /> },
    { label: "Students", key: "students", icon: <PiStudentDuotone /> },
    { label: "Fee Collection", key: "feecollection", icon: <HiOutlineCash /> },
  ];

  return (
    <aside className="w-64 bg-[#0b2a44] text-white h-full">
      <div className="h-16 flex items-center justify-center border-b border-white/10">
        <img src={Logo} alt="Logo" className="h-9" />
      </div>

      <nav className="py-3 text-sm">
        {menuItems.map((item) => (
          <button
            key={item.key}
            onClick={() => setSection(item.key)}
            className={`w-full flex items-center gap-3 px-6 py-2.5 transition-all
              ${
                activeSection === item.key
                  ? "bg-[#0e3a55] border-l-4 border-[#F8AF2A]"
                  : "hover:bg-[#0e3a55]/70"
              }`}
          >
            <span className="text-lg">{item.icon}</span>
            <span className="font-medium">{item.label}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
};
