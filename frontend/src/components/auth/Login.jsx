import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { HiOutlineMail, HiOutlineLockClosed } from "react-icons/hi";
import { RiShieldUserLine } from "react-icons/ri";

const Login = () => {
  const navigate = useNavigate(); 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.message || "Login failed");

      // Token & user save
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      
      navigate("/admindashboard");

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center  bg-gradient-to-br from-[#103153] via-[#0e3a55] to-[#081e2c] px-4">
      <div className="relative w-full max-w-md rounded-2xl bg-white/90 backdrop-blur-xl shadow-2xl px-8 pb-8 pt-28">
        <div className="absolute top-5 left-1/2 -translate-x-1/2">
          <div className="w-17 h-17 rounded-2xl bg-[#F8AF2A] flex items-center justify-center">
            <RiShieldUserLine className="text-white text-3xl" />
          </div>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold epilogue text-[#103153]">Welcome Back</h1>
          <p className="text-gray-500 epilogue text-sm mt-2">Login to continue</p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="text-sm epilogue font-medium text-gray-700">Email</label>
            <div className="relative mt-2">
              <HiOutlineMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@email.com"
                required
                className="w-full rounded-md border border-gray-300 pl-11 pr-4 py-3 text-sm outline-none"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium epilogue text-gray-700">Password</label>
            <div className="relative mt-2">
              <HiOutlineLockClosed className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full rounded-md border border-gray-300 pl-11 pr-4 py-3 text-sm outline-none"
              />
            </div>
          </div>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-[#103153] epilogue py-3 font-semibold text-white shadow-lg hover:brightness-110 active:scale-[0.98] transition"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
