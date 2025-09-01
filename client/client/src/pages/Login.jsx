// src/pages/Login.jsx
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import axiosInstance from "../services/axiosInstance";
import { useAuth } from "../services/authService"; // correct path to your AuthContext

export default function Login() {
  const { authUser, login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || null;

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [submitting, setSubmitting] = useState(false);

  // if already logged in, redirect to appropriate panel
  useEffect(() => {
    if (authUser) {
      const role = authUser.role?.toLowerCase();
      const roleMap = {
        admin: "/adminpanel",
        trainer: "/trainerpanel",
        user: "/userpanel",
      };
      navigate(roleMap[role] || "/", { replace: true });
    }
  }, [authUser, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await axiosInstance.post("/api/users/login", formData);

      const token = res.data.accessToken;
      const user = res.data.user;

      if (!token || !user) {
        throw new Error("Invalid response from server");
      }

      // Persist in context (which also sets localStorage)
      login(user, token);

      // Redirect priority: protected route origin > role-based panel
      if (from) {
        navigate(from, { replace: true });
      } else {
        const role = user.role?.toLowerCase();
        const roleMap = {
          admin: "/adminpanel",
          trainer: "/trainerpanel",
          user: "/userpanel",
        };
        navigate(roleMap[role] || "/", { replace: true });
      }

      toast.success("Login successful!");
    } catch (err) {
      const msg =
        err.response?.data?.message || err.message || "Login failed.";
      toast.error(msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center py-5 px-4 bg-[#141414] h-screen">
      <div className="flex flex-col w-full max-w-xl py-5">
        <h2 className="text-white md:px-48 text-[28px] font-bold leading-tight px-[190px] pt-5 pb-3">
          Login
        </h2>
        <form onSubmit={handleSubmit}>
          {/* Email Field */}
          <div className="flex flex-wrap items-end gap-4 px-4 py-3 max-w-md">
            <label className="flex flex-col flex-1 min-w-40">
              <p className="text-white text-base font-medium leading-normal pb-2">
                Email
              </p>
              <input
                required
                type="email"
                placeholder="Enter your email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full h-14 p-4 rounded-lg text-white bg-[#363636] placeholder-[#adadad] text-base font-normal focus:outline-none"
              />
            </label>
          </div>

          {/* Password Field */}
          <div className="flex flex-wrap items-end gap-4 px-4 py-3 max-w-md">
            <label className="flex flex-col flex-1 min-w-40">
              <p className="text-white text-base font-medium leading-normal pb-2">
                Password
              </p>
              <input
                required
                type="password"
                placeholder="Enter your password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full h-14 p-4 rounded-lg text-white bg-[#363636] placeholder-[#adadad] text-base font-normal focus:outline-none"
              />
            </label>
          </div>

          {/* Forgot Password */}
          <p
            onClick={() => navigate("/forgetpassword")}
            className="text-[#adadad] text-sm font-normal leading-normal px-4 pt-1 pb-3 underline cursor-pointer"
          >
            Forgot password?
          </p>

          {/* Login Button */}
          <div className="flex px-4 py-3 max-w-md">
            <button
              type="submit"
              disabled={submitting}
              className="w-full max-w-md h-12 rounded-lg bg-black text-white text-base font-bold tracking-wide truncate disabled:opacity-60"
            >
              {submitting ? "Logging in..." : "Login"}
            </button>
          </div>

          <p className="text-[#adadad] text-sm font-normal leading-normal px-[110px] md:px-36 pt-1 pb-3">
            Don't have an account?{" "}
            <span
              onClick={() => navigate("/register")}
              className="text-white underline cursor-pointer"
            >
              Register
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}
