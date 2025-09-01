import { useState } from "react";
import axiosInstance from "../services/axiosInstance";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function ResetPassword(){

    const [newPassword, setNewPassword] = useState("");
  const navigate = useNavigate();

  const handleReset = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("resetToken");

    if (!token) {
      toast.error("Reset token not found. Please try again.");
      return;
    }

    try {
      const res = await axiosInstance.post("/api/users/reset-password", {
        token,
        newPassword,
      });

      toast.success(res.data.message);
      localStorage.removeItem("resetToken"); // clean up
      navigate("/login"); // back to login
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };



    return (
        <div className="flex justify-center  items-center py-5 bg-[#141414] h-screen">
  <div className="flex flex-col w-full max-w-xl px-6 py-5 border border-white rounded-lg">
    {/* Heading */}
    <h2 className="text-white text-[28px] font-bold leading-tight text-center pt-5 pb-3">
      New password
    </h2>

    {/* Subtext */}
    <p className="text-white text-base font-normal leading-normal text-center pt-1 pb-3">
      Enter the new password below
    </p>

    <form onSubmit={handleReset} className="w-full">
      {/* Password Input */}
      <div className="w-full py-3">
        <label className="flex flex-col w-full">
          <input
            type="password"
            placeholder="Password"
            value={newPassword}
            required
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full h-14 p-[15px] rounded-xl text-white bg-[#212121] border border-[#474747] placeholder-[#ababab] text-base font-normal focus:outline-none focus:border-[#474747]"
          />
        </label>
      </div>

      {/* Submit Button */}
      <div className="w-full py-3">
        <button
          type="submit"
          className="w-full h-12 rounded-full bg-black text-white text-sm font-bold tracking-wide"
        >
          Submit
        </button>
      </div>
    </form>
  </div>
</div>

    )
}