import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosInstance from "../../services/axiosInstance"; // your custom axios
import Swal from "sweetalert2";

export default function Updateplan() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [membership, setMembership] = useState({
    name: "",
    period: "1 Month",
    price: "",
  });

  // Fetch plan by ID
  useEffect(() => {
    const fetchPlan = async () => {
      try {
        const res = await axiosInstance.get(`/api/plans/${id}`);
        const data = res.data.data;
        setMembership({
          name: data.name,
          period: data.period,
          price: data.price.toString(),
        });
      } catch (err) {
        console.error("Failed to fetch plan", err);
      }
    };
    fetchPlan();
  }, [id]);

  const handleChange = (e) => {
    setMembership({ ...membership, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      // Show loading dialog
      Swal.fire({
        title: "Updating...",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      // Send PUT request
      await axiosInstance.put(`/api/plans/${id}`, membership);

      // Close loading and show success
      Swal.fire({
        icon: "success",
        title: "Updated!",
        text: "Membership plan updated successfully.",
        timer: 2000,
        showConfirmButton: false,
        color: "#fff",
        customClass: {
          popup: "swal-small",
          title: "swal-small-title",
          htmlContainer: "swal-small-text",
          confirmButton: "swal-small-btn",
          cancelButton: "swal-small-btn",
        },
      });

      // Navigate after delay
      setTimeout(() => navigate("/adminpanel/plans"), 2000);
    } catch (err) {
      console.error("Failed to update", err);

      // Show error alert
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: "Something went wrong. Please try again.",
        color: "#fff",
        customClass: {
          popup: "swal-small",
          title: "swal-small-title",
          htmlContainer: "swal-small-text",
          confirmButton: "swal-small-btn",
          cancelButton: "swal-small-btn",
        },
      });
    }
  };

  return (
    <div className="px-40 bg-[#141414] h-screen flex flex-1 justify-center py-5">
      <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
        <div className="flex flex-wrap justify-between gap-3 p-4">
          <p className="text-white tracking-light text-[32px] font-bold leading-tight min-w-72">
            Update Membership
          </p>
        </div>

        {/* Membership Name Input */}
        <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
          <label className="flex flex-col min-w-40 flex-1">
            <input
              name="name"
              value={membership.name}
              onChange={handleChange}
              placeholder="Membership name"
              className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-white focus:outline-0 focus:ring-0 border border-[#474747] bg-[#212121] focus:border-[#474747] h-14 placeholder:text-[#ababab] p-[15px] text-base font-normal leading-normal"
            />
          </label>
        </div>

        {/* Period Select */}
        <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
          <label className="flex flex-col min-w-40 flex-1">
            <select
              name="period"
              value={membership.period}
              onChange={handleChange}
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
              name="price"
              value={membership.price}
              onChange={handleChange}
              placeholder="Price"
              className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-white focus:outline-0 focus:ring-0 border border-[#474747] bg-[#212121] focus:border-[#474747] h-14 placeholder:text-[#ababab] p-[15px] text-base font-normal leading-normal"
            />
          </label>
        </div>

        {/* Update Button */}
        <div className="flex px-4 py-3 justify-start">
          <button
            onClick={handleSubmit}
            className="flex transition active:scale-95 min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 bg-black text-white text-sm font-bold leading-normal tracking-[0.015em]"
          >
            <span className="truncate">Update</span>
          </button>
        </div>
      </div>
    </div>
  );
}
