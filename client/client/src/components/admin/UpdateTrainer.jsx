import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../../services/axiosInstance";
import { toast } from "react-toastify";

export default function UpdateTrainer() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    experience: "",
    specialization: "",
  });

  useEffect(() => {
    const fetchTrainer = async () => {
      try {
        const res = await axiosInstance.get(`/api/trainers/${id}`);
        const { phone } = res.data.data.userId;
        const { name, experience, specialization } = res.data.data;

        setFormData({ name, phone, experience, specialization });
      } catch (err) {
        toast.error("Failed to load trainer data");
      }
    };

    fetchTrainer();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.put(`/api/trainers/${id}`, formData);
      toast.success("Trainer updated successfully!");
      navigate("/adminpanel/trainers");
    } catch (err) {
      toast.error("Update failed");
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="px-40 flex flex-1 h-screen justify-center bg-[#141414] py-5">
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
            <div className="flex flex-wrap justify-between gap-3 p-4">
              <p className="text-white tracking-wide text-[32px] font-bold leading-tight min-w-72">
                Update Trainer
              </p>
            </div>

            <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
              <label className="flex flex-col min-w-40 flex-1">
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Name"
                  className="form-input w-full resize-none overflow-hidden rounded-xl text-white focus:outline-none focus:ring-0 border border-[#474747] bg-[#212121] h-14 placeholder:text-[#ababab] p-[15px] text-base font-normal leading-normal"
                />
              </label>
            </div>

            <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
              <label className="flex flex-col min-w-40 flex-1">
                <input
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Phone"
                  className="form-input w-full resize-none overflow-hidden rounded-xl text-white focus:outline-none focus:ring-0 border border-[#474747] bg-[#212121] h-14 placeholder:text-[#ababab] p-[15px] text-base font-normal leading-normal"
                />
              </label>
            </div>

            <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
              <label className="flex flex-col min-w-40 flex-1">
                <input
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  placeholder="Experience"
                  className="form-input w-full resize-none overflow-hidden rounded-xl text-white focus:outline-none focus:ring-0 border border-[#474747] bg-[#212121] h-14 placeholder:text-[#ababab] p-[15px] text-base font-normal leading-normal"
                />
              </label>
            </div>

            <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
              <label className="flex flex-col min-w-40 flex-1">
                <input
                  name="specialization"
                  value={formData.specialization}
                  onChange={handleChange}
                  placeholder="Specialization"
                  className="form-input w-full resize-none overflow-hidden rounded-xl text-white focus:outline-none focus:ring-0 border border-[#474747] bg-[#212121] h-14 placeholder:text-[#ababab] p-[15px] text-base font-normal leading-normal"
                />
              </label>
            </div>

            <div className="flex px-4 py-3 justify-start">
              <button className="min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 bg-black text-white text-sm font-bold leading-normal tracking-[0.015em]">
                <span className="truncate">Submit</span>
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
