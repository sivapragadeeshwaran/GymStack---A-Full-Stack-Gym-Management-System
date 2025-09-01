import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../services/axiosInstance";
import { toast } from "react-toastify";

export default function Addadmin() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axiosInstance.post("/api/admins/", formData); // Adjust the endpoint as per your backend

      if (res.data.success) {
        toast.success("Admin added successfully");
        navigate("/adminpanel/admins"); // Adjust route if needed
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Error adding admin");
    }
  };

  return (
    <div className="bg-[#141414] h-screen flex flex-1 px-36 py-5">
      <form
        onSubmit={handleSubmit}
        className="layout-content-container flex flex-col w-[512px] max-w-[512px] py-5 max-w-[960px] flex-1"
      >
        <div className="flex flex-wrap justify-between gap-3 p-4">
          <p className="text-white tracking-wide text-[32px] font-bold leading-tight min-w-72">
            Add Admin
          </p>
        </div>

        {/* Name Input */}
        <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
          <label className="flex flex-col min-w-40 flex-1">
            <input
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="userName"
              className="form-input w-full flex-1 resize-none overflow-hidden rounded-xl text-white border border-[#474747] bg-[#212121] focus:outline-0 focus:ring-0 focus:border-[#474747] h-14 placeholder:text-[#ababab] p-[15px] text-base font-normal leading-normal"
            />
          </label>
        </div>

        {/* Email Input */}
        <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
          <label className="flex flex-col min-w-40 flex-1">
            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="form-input w-full flex-1 resize-none overflow-hidden rounded-xl text-white border border-[#474747] bg-[#212121] focus:outline-0 focus:ring-0 focus:border-[#474747] h-14 placeholder:text-[#ababab] p-[15px] text-base font-normal leading-normal"
            />
          </label>
        </div>

        {/* Phone Input */}
        <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
          <label className="flex flex-col min-w-40 flex-1">
            <input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone"
              className="form-input w-full flex-1 resize-none overflow-hidden rounded-xl text-white border border-[#474747] bg-[#212121] focus:outline-0 focus:ring-0 focus:border-[#474747] h-14 placeholder:text-[#ababab] p-[15px] text-base font-normal leading-normal"
            />
          </label>
        </div>

        {/* Password Input */}
        <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
          <label className="flex flex-col min-w-40 flex-1">
            <input
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="form-input w-full flex-1 resize-none overflow-hidden rounded-xl text-white border border-[#474747] bg-[#212121] focus:outline-0 focus:ring-0 focus:border-[#474747] h-14 placeholder:text-[#ababab] p-[15px] text-base font-normal leading-normal"
            />
          </label>
        </div>

        {/* Submit Button */}
        <div className="flex px-4 py-3 justify-start">
          <button
            type="submit"
            className="flex transition active:scale-95 min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 bg-black text-white text-sm font-bold leading-normal tracking-[0.015em]"
          >
            <span className="truncate">Submit</span>
          </button>
        </div>
      </form>
    </div>
  );
}
