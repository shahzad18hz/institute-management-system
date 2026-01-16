import React from "react";
import {
  HiOutlineMenu,
  HiOutlineSearch,
  HiOutlineUserCircle,
  HiOutlineLogout,
  HiOutlineCog,
} from "react-icons/hi";

export const Header = ({ toggleSidebar, onLogout }) => {
  return (
    <div className="h-15 bg-[#0b2a44] shadow flex items-center justify-between px-6 text-white">
      
      {/* Left: Menu + Title */}
      <div className="flex items-center gap-4">
        <button
          className="lg:hidden  text-2xl"
          onClick={toggleSidebar}
        >
          <HiOutlineMenu />
        </button>
        <h1 className="font-bold text-lg">Admin Dashboard</h1>
      </div>

      {/* Center: Search */}
      <div className="hidden md:flex items-center bg-[#0e3a55] rounded px-3 py-1">
        <HiOutlineSearch className="text-gray-300" />
        <input
          type="text"
          placeholder="Search..."
          className="bg-transparent outline-none px-2 text-sm  placeholder-gray-300"
        />
      </div>

      {/* Right: Profile + Settings + Logout */}
      <div className="flex items-center gap-4">
        <button className="text-xl hover:text-gray-300">
          <HiOutlineCog />
        </button>

        <button className="text-2xl hover:text-gray-300">
          <HiOutlineUserCircle />
        </button>

        <button
          onClick={onLogout}
          className="flex items-center gap-1 text-sm bg-red-500 hover:bg-red-600 px-3 py-1 rounded"
        >
          <HiOutlineLogout />
          Logout
        </button>
      </div>
    </div>
  );
};
