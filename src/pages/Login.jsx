import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import app from "../fireBase";
import "../main.css";

const auth = getAuth(app);

function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState({
    type: "",
    text: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, form.email, form.password);
      setMessage({ type: "success", text: "Login successful!" });
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      setMessage({ type: "error", text: error.message });
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center  relative overflow-hidden">
      {/* Movie themed decorative elements */}
      <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-r from-red-500 to-yellow-500 rounded-full opacity-20 blur-xl" />
      <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-gradient-to-r from-yellow-500 to-red-500 rounded-full opacity-20 blur-xl" />

      <div className="relative bg-gray-800/90 backdrop-blur-lg p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-700">
        <h2 className="text-3xl font-bold text-center text-white mb-8 tracking-tight">
          Movies Club Login
        </h2>

        {message.text && (
          <div
            className={`mb-6 p-4 rounded-lg text-sm font-medium text-center ${
              message.type === "success"
                ? "bg-green-800/80 text-green-300 border border-green-600"
                : "bg-red-800/80 text-red-300 border border-red-600"
            }`}
          >
            {message.type === "success" ? "✓ " : "✕ "}
            {message.text}
          </div>
        )}

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-300"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="Enter your email"
              value={form.email}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-700/70 border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors duration-200 text-white placeholder-gray-400"
              required
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-300"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              placeholder="Enter your password"
              value={form.password}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-700/70 border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors duration-200 text-white placeholder-gray-400"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-red-600 to-yellow-500 text-white py-3 rounded-xl font-semibold hover:from-red-700 hover:to-yellow-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-800 cursor-pointer"
          >
            Login
          </button>
        </form>

        <p className="mt-6 text-center text-gray-400 text-sm font-medium">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-yellow-400 font-semibold hover:text-yellow-300 transition-colors duration-200"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;