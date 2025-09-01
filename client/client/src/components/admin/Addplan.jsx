import { useState } from "react";
import axiosInstance from "../../services/axiosInstance";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
export default function Addplan() {
  const [name, setName] = useState("");
  const [period, setPeriod] = useState("1 Month");
  const [price, setPrice] = useState("");
  const [includesPersonalTraining, setIncludesPersonalTraining] =
    useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // TODO: Add submit logic
    if (!name || !period || !price) {
      toast.warn("Please fill in all fields.");
      return;
    }
    // Submit logic here
    try {
      const res = await axiosInstance.post("/api/plans/", {
        name,
        period,
        price,
        includesPersonalTraining,
      });
      if (res.data.success) {
        toast.success("Plan added successfully!");
        // Reset form
        setName("");
        setPeriod("1 Month");
        setPrice("");
        setIncludesPersonalTraining(false);
        // Optionally refetch plans or update UI
        navigate("/adminpanel/plans");
      }
    } catch (err) {
      console.error("Error adding plan:", err);
      toast.error("Failed to add plan.");
    }
  };

  return (
    <div className="bg-[#141414] h-screen px-40 flex flex-1 justify-center py-5">
      <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
        <div className="flex flex-wrap justify-between gap-3 p-4">
          <p className="text-white tracking-light text-[32px] font-bold leading-tight min-w-72">
            Add Membership
          </p>
        </div>
        <form onSubmit={handleSubmit}>
          {/* Membership Name Input */}
          <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
            <label className="flex flex-col min-w-40 flex-1">
              <input
                placeholder="Membership name"
                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-white focus:outline-0 focus:ring-0 border border-[#474747] bg-[#212121] focus:border-[#474747] h-14 placeholder:text-[#ababab] p-[15px] text-base font-normal leading-normal"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </label>
          </div>

          {/* Period Select Dropdown */}
          <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
            <label className="flex flex-col min-w-40 flex-1">
              <select
                value={period}
                onChange={(e) => setPeriod(e.target.value)}
                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-white focus:outline-0 focus:ring-0 border border-[#474747] bg-[#212121] focus:border-[#474747] h-14 placeholder:text-[#ababab] p-[15px] text-base font-normal leading-normal"
              >
                <option value="1 Month">1 Month</option>
                <option value="3 Month">3 Month</option>
                <option value="6 Month">6 Month</option>
                <option value="12 Month">12 Month</option>
              </select>
            </label>
          </div>

          {/* Price Input */}
          <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
            <label className="flex flex-col min-w-40 flex-1">
              <input
                type="number"
                placeholder="Price"
                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-white focus:outline-0 focus:ring-0 border border-[#474747] bg-[#212121] focus:border-[#474747] h-14 placeholder:text-[#ababab] p-[15px] text-base font-normal leading-normal"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </label>
          </div>

          <div className="flex max-w-[480px] flex-col gap-2 px-4 py-3 text-white">
            <p className="text-base font-medium">Includes Personal Training?</p>
            <div className="flex gap-6">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  value={true}
                  checked={includesPersonalTraining === true}
                  onChange={() => setIncludesPersonalTraining(true)}
                />
                <span>Yes</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  value={false}
                  checked={includesPersonalTraining === false}
                  onChange={() => setIncludesPersonalTraining(false)}
                />
                <span>No</span>
              </label>
            </div>
          </div>

          {/* Add Button */}
          <div className="flex px-4 py-3 justify-start">
            <button
              type="submit"
              className="flex min-w-[84px] transition active:scale-95 max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 bg-black text-white text-sm font-bold leading-normal tracking-[0.015em]"
            >
              <span className="truncate">Add Membership</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
