import  { useState } from "react";
import axiosInstance from "../services/axiosInstance"
import { useNavigate } from "react-router-dom"; // if using react-router
import { toast } from "react-toastify";


export default function ForgetPassword(){
 const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axiosInstance.post("/api/users/forgot-password", { email });

      toast.success(res.data.message);
      
      // save token temporarily or pass it to reset-password page
      localStorage.setItem("resetToken", res.data.token);
      
      // navigate to reset-password form
      navigate("/resetpassword");

    } catch (error) {
      toast.error(
        error.response?.data?.message || "Something went wrong"
      );
    }
  };



    return (
      <div className="flex justify-center items-center items-start py-5 px-4 md:px-40 bg-[#141414] h-screen">
  <div className="flex flex-col px-2 max-w-xl py-5 border border-white rounded-lg">
    {/* Heading */}
    <h2 className="text-white text-[28px] font-bold leading-tight text-center px-4 pt-5 pb-3">
      Reset Password
    </h2>

    {/* Subtext */}
    <p className="text-white text-base font-normal leading-normal text-center px-4 pt-1 pb-3">
      Please enter your registered email ID to reset your password.
    </p>
     
     <form onSubmit={handleSubmit}>
    {/* Email Input */}
    <div className="flex flex-wrap items-end gap-4 px-4 py-3 max-w-md">
      <label className="flex flex-col flex-1 min-w-40">
        <input
          type="email"
          placeholder="Email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}

          className="w-full h-14 p-[15px] rounded-xl text-white bg-[#212121] border border-[#474747] placeholder-[#ababab] text-base font-normal focus:outline-none focus:border-[#474747]"
        />
      </label>
    </div>

    {/* Submit Button */}
    <div className="flex px-4 py-3">
      <button type="submit"
       className="w-full max-w-md h-10 px-2 rounded-full bg-black text-white text-sm font-bold tracking-wide truncate">
        Submit
      </button>
    </div>
    </form>
  </div>
</div>

)
}