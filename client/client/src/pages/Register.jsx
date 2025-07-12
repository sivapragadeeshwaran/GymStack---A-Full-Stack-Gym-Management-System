import React, { useState } from "react";
import axiosInstance from "../services/axiosInstance";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Register(){
     const navigate = useNavigate();
    const [formData, setFormData] = useState({
  username: "",
  email: "",
  password: "",
  dateOfBirth: "",
  membershipPlan: "Monthly",
  trainerAssigned: "Self", // default value
});



  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axiosInstance.post("/api/users/register", {
        ...formData,
        role: "user",          // fixed role
        feeStatus: "Paid",     // backend requires this
      });

      toast.success("Registration successful! Please login.");
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed.");
    }
  };


const handleChange = (e) => {
  const { name, value } = e.target;
  setFormData((prev) => ({ ...prev, [name]: value }));
};




    return(
       <div className="flex justify-center bg-[#141414] py-5 md:px-40">
    <form onSubmit={handleSubmit}>
     <div className="flex flex-col w-full max-w-xl py-5">
    {/* Header */}
    <div className="flex justify-between flex-wrap gap-3 p-4">
      <p className="text-white text-2xl md:text-[32px] font-bold leading-tight min-w-72">Join Strength Zone</p>
    </div>

    {/* Name */}
    <div className="flex flex-wrap items-end gap-4 px-4 py-3 max-w-md">
      <label className="flex flex-col flex-1 min-w-40">
        <input type="text" name="username" value={formData.username} onChange={handleChange}
          placeholder="Name"
          className="w-full h-14 p-4 rounded-xl text-white bg-[#303030] placeholder-[#ababab] text-base font-normal focus:outline-none"
        />
      </label>
    </div>

    {/* Email */}
    <div className="flex flex-wrap items-end gap-4 px-4 py-3 max-w-md">
      <label className="flex flex-col flex-1 min-w-40">
        <input type="email" name="email" value={formData.email} onChange={handleChange}
          placeholder="Email"
          className="w-full h-14 p-4 rounded-xl text-white bg-[#303030] placeholder-[#ababab] text-base font-normal focus:outline-none"
        />
      </label>
    </div>

    {/* Date of Birth */}
    <div className="flex flex-wrap items-end gap-4 px-4 py-3 max-w-md">
      <label className="flex flex-col flex-1 min-w-40">
        <input
          type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange}
          placeholder="Date of Birth"
          className="w-full h-14 p-4 rounded-xl text-white bg-[#303030] placeholder-[#ababab] text-base font-normal focus:outline-none"
        />
      </label>
    </div>

    {/* Password */}
    <div className="flex flex-wrap items-end gap-4 px-4 py-3 max-w-md">
      <label className="flex flex-col flex-1 min-w-40">
        <input
          type="password" name="password" value={formData.password} onChange={handleChange}
          placeholder="Password"
          className="w-full h-14 p-4 rounded-xl text-white bg-[#303030] placeholder-[#ababab] text-base font-normal focus:outline-none"
        />
      </label>
    </div>

    {/* Membership Plan */}
    <div className="flex flex-wrap items-end gap-4 px-4 py-3 max-w-md">
      <label className="flex flex-col flex-1 min-w-40">
        <select name="membershipPlan" value={formData.membershipPlan} onChange={handleChange} 
          className="w-full h-14 p-4 rounded-xl text-white bg-[#303030] placeholder-[#ababab] text-base font-normal focus:outline-none"
        >
          <option value="">Membership Plan</option>
          <option value="Monthly">Monthly </option>
          <option value="Quarterly">Quarterly</option>
          <option value="Yearly">Yearly </option>
        </select>
      </label>
    </div>

    {/* Radio */}
    <div className="flex items-center gap-4 px-4 py-3">
  {/* Label */}
  <label className="text-white text-base font-medium">Personal Trainer</label>

  {/* Option: Yes */}
  <label className="text-sm font-medium flex items-center justify-center rounded-xl border border-[#474747] px-4 h-11 text-white relative cursor-pointer has-[:checked]:border-[3px] has-[:checked]:border-black">
    Yes
    <input
      type="radio"
      name="trainerAssigned"
      value="Yes"
      checked={formData.trainerAssigned === "Yes"}
      onChange={handleChange}
      className="absolute invisible"
    />
  </label>

  {/* Option: Self */}
  <label className="text-sm font-medium flex items-center justify-center rounded-xl border border-[#474747] px-4 h-11 text-white relative cursor-pointer has-[:checked]:border-[3px] has-[:checked]:border-black">
    Self
    <input
      type="radio"
      name="trainerAssigned"
      value="Self"
      checked={formData.trainerAssigned === "Self"}
      onChange={handleChange}
      className="absolute invisible"
    />
  </label>
</div>


    {/* Button */}
    <div className="flex px-4 py-3">
      <button type="submit"
        className="w-full max-w-md h-12 px-5 rounded-xl bg-black text-white font-bold text-base tracking-wide truncate"
      >
        Pay Now
      </button>
    </div>
  </div>
  </form>
</div>

    )
}