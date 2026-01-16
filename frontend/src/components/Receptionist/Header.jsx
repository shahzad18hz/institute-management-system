import React from "react";

export const Header = () => {
  return (
    <header className="h-16 bg-white border-b flex items-center justify-between px-6">
      <h1 className="text-lg font-semibold">Receptionist Dashboard</h1>

      <button
        onClick={() => {
          localStorage.clear();
          window.location.href = "/login";
        }}
        className="text-sm text-red-500"
      >
        Logout
      </button>
    </header>
  );
};
