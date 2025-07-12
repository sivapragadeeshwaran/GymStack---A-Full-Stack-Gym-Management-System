import { useAuth } from "../services/authService";
import { useState } from "react";
import { toast } from "react-toastify";
import axiosInstance from "../services/axiosInstance"
import { useNavigate } from "react-router-dom";


export default function Login(){
const { login } = useAuth();

const [formData, setFormData] = useState({
  email: "",
  password: ""
});
 const navigate = useNavigate();

const handleChange = (e) => {
  const { name, value } = e.target;
  setFormData((prev) => ({ ...prev, [name]: value }));
};



const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await axiosInstance.post("/api/users/login", formData);

    localStorage.setItem("token", res.data.accessToken);
    login(res.data.user); // 🟢 set user globally

    const role = res.data.user.role;
      if (role === "admin") navigate("/adminpanel");
      else if (role === "trainer") navigate("/trainerpanel");
      else navigate("/userpanel");

    toast.success("Login successful!");


  } catch (err) {
    toast.error(err.response?.data?.message || "Login failed.");
  }
};




    return(
        <>
    <div className="flex justify-center py-5 md:px-40 bg-[#141414] h-screen">
  <div className="flex flex-col w-full max-w-xl py-5">
    {/* Heading */}
    <h2 className="text-white text-[28px] font-bold leading-tight text-center px-4 pt-5 pb-3">
      Login
    </h2>
      <form onSubmit={handleSubmit}>
    {/* Email Field */}
    <div className="flex flex-wrap items-end gap-4 px-4 py-3  max-w-md">
      <label className="flex flex-col flex-1 min-w-40">
        <p className="text-white text-base font-medium leading-normal pb-2">Email</p>
        <input
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
        <p className="text-white text-base font-medium leading-normal pb-2">Password</p>
        <input
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
    <p className="text-[#adadad] text-sm font-normal leading-normal px-4 pt-1 pb-3 underline cursor-pointer">
      Forgot password?
    </p>

    {/* Login Button */}
    <div className="flex px-4 py-3 max-w-md">
      <button type="submit" className="w-full max-w-md h-12  rounded-lg bg-black text-white text-base font-bold tracking-wide truncate">
        Login
      </button>
    </div>
    </form>
  </div>
</div>

        </>
    )
}