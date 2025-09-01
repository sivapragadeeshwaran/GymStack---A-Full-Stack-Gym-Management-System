import  { useState } from "react";
import axiosInstance from "../../services/axiosInstance";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export default function Addtrainer(){

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    experience: "",
    specialization: "",
  });

  const handleChange = (e) => {
    const { placeholder, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [placeholder.toLowerCase()]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post("/api/trainers/", formData);
       toast.success(response.data.message || "Trainer added successfully!");
      setFormData({
        name: "",
        email: "",
        password: "",
        phone: "",
        experience: "",
        specialization: "",
      });
    } catch (err) {
      const msg = err.response?.data?.message || "Something went wrong!";
    toast.error(msg);
    }
  };
    return(
       <div className="px-40 flex flex-1 justify-center py-5 bg-[#141414]">
  <div className="flex flex-col max-w-[960px] flex-1">
    <div className="flex flex-wrap justify-between gap-3 p-4">
      <p className="text-white text-[32px] font-bold leading-tight tracking-light min-w-72">
        Add Gym Trainer
      </p>
    </div>

    {/* Form Fields */}
    {[
      { label: "Name", placeholder: "Name" },
      { label: "Email", placeholder: "email" },
      { label: "Password", placeholder: "Password" },
      { label: "Phone", placeholder: "Phone" },
      { label: "Experience", placeholder: "Experience" },
      { label: "Specialization", placeholder: "Specialization" },
    ].map((field, index) => (
      <div key={index} className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
        <label className="flex flex-col min-w-40 flex-1">
          <input
            placeholder={field.placeholder}
             value={formData[field.placeholder.toLowerCase()]}
                onChange={handleChange}
            className="form-input w-full rounded-xl h-14 bg-[#212121] border border-[#474747] text-white placeholder:text-[#ababab] text-base font-normal p-[15px] leading-normal focus:outline-0 focus:ring-0 focus:border-[#474747]"
          />
        </label>
      </div>
    ))}

    {/* Submit Button */}
    <div className="flex items-center py-3">
      <button  onClick={handleSubmit}
       className="flex min-w-[84px] max-w-[470px] flex-1 h-10 px-4 items-center justify-center rounded-full bg-black text-white text-sm font-bold tracking-[0.015em]">
        <span className="truncate">Submit</span>
      </button>
    </div>
  </div>
</div>

    )
}