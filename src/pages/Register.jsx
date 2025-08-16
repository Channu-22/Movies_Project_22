
import { useState } from "react";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import app from "../fireBase";
import { Link, useNavigate } from "react-router-dom";

const auth = getAuth(app);

function Register() {
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
      const userDetails = await createUserWithEmailAndPassword(
        auth,
        form.email,
        form.password
      );
      const user = userDetails.user;
      setMessage({ type: "success", text: "Account created successfully! 🎉" });
      setTimeout(() => {
        navigate("/login")
      },1500);
    } catch (error) {
      setMessage({ type: "error", text: error.message });
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center  relative overflow-hidden">
      {/* Decorative blurred blobs */}
      <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full opacity-20 blur-xl animate-pulse" />
      <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full opacity-20 blur-xl animate-pulse" />

      <div className="relative bg-white/80 backdrop-blur-lg p-8 rounded-2xl shadow-xl w-full max-w-md transition-all duration-500 hover:shadow-2xl">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8 tracking-tight drop-shadow-sm">
          Register
        </h2>

        {message.text && (
          <div
            className={`mb-6 p-4 rounded-lg text-sm font-medium text-center transform transition-all duration-500 animate-bounce shadow-lg ${
              message.type === "success"
                ? "bg-green-100 text-green-900 border-2 border-green-400 ring-1 ring-green-300 shadow-green-300"
                : "bg-gradient-to-r from-red-100 to-rose-100 text-red-800 border border-red-300 shadow-red-200"
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
              className="block text-sm font-medium text-gray-700"
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
              className="w-full px-4 py-3 bg-white/70 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200 text-gray-700 placeholder-gray-400"
              required
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
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
              className="w-full px-4 py-3 bg-white/70 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200 text-gray-700 placeholder-gray-400"
              required
            />
          </div>

          <button
            type="submit"
            className="cursor-pointer w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-3 rounded-xl font-semibold hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-[1.03] active:scale-95 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2"
          >
            Register
          </button>
        </form>

        <p className="mt-6 text-center text-gray-600 text-sm font-medium">
          Already have an account?{" "}
          <Link
            to="/login"
            className="relative inline-block px-4 py-1.5 text-purple-700 font-semibold bg-purple-100 rounded-full hover:bg-purple-200 hover:text-purple-900 transition-all duration-300 transform hover:scale-105 cursor-pointer group shadow-md"
          >
            <span className="relative z-10">Login</span>
            <span className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 opacity-0 group-hover:opacity-30 transition-opacity duration-300 blur-sm"></span>
            <span className="absolute inset-0 rounded-full border-2 border-transparent group-hover:border-purple-300 transition duration-300 animate-pulse"></span>
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
