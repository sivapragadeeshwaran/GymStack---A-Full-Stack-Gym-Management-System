import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { updateMember } from "../../API/userApi";
import Swal from "sweetalert2";
import axiosInstance from "../../services/axiosInstance";

export default function Updatemember() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    phone: "",
    membershipPlan: "",
  });

  const [plans, setPlans] = useState([]);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const res = await axiosInstance.get("/api/plans");

        setPlans(res.data.data);
      } catch (err) {
        console.error("Failed to load plans", err);
      }
    };
    fetchPlans();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosInstance.get(`/api/admin/getmemberbyId/${id}`);

        const member = res.data.data; // ✅ Corrected path

        setFormData({
          username: member.username,
          phone: member.phone,
          membershipPlan: member.membershipPlan?._id || "",
        });
      } catch (err) {
        console.error("Failed to load member", err);
      }
    };
    fetchData();
  }, [id]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async () => {
    try {
      await updateMember(id, formData);
      Swal.fire({
        icon: "success",
        title: "Member Updated",
        text: "The member information has been successfully updated.",
        background: "#1e1e1e",
        color: "#fff",
        confirmButtonColor: "#3085d6",
        customClass: {
          popup: "swal-small",
          title: "swal-small-title",
          htmlContainer: "swal-small-text",
          confirmButton: "swal-small-btn",
          cancelButton: "swal-small-btn",
        },
      });
      navigate("/adminpanel/members"); // back to members page
    } catch (err) {
      console.error("Update failed", err);
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: "An error occurred while updating member details.",
        background: "#1e1e1e",
        color: "#fff",
        confirmButtonColor: "#d33",
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
    <div className="relative flex min-h-screen flex-col bg-[#141414] overflow-x-hidden">
      <div className="layout-container flex h-full grow flex-col">
        <div className="md:px-40 px-5 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col w-full max-w-[960px] py-5 flex-1">
            {/* Name Field */}
            <div className="flex max-w-[480px] flex-wrap gap-4 px-4 py-3">
              <label className="flex flex-col min-w-40 flex-1">
                <p className="text-white text-base font-medium pb-2">Name</p>
                <input
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Enter name"
                  className="w-full h-14 p-4 text-white bg-[#303030] placeholder-[#ababab] rounded-xl border-none focus:outline-none"
                />
              </label>
            </div>

            {/* Phone Field */}
            <div className="flex max-w-[480px] flex-wrap gap-4 px-4 py-3">
              <label className="flex flex-col min-w-40 flex-1">
                <p className="text-white text-base font-medium pb-2">
                  Phone Number
                </p>
                <input
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter phone number"
                  className="w-full h-14 p-4 text-white bg-[#303030] placeholder-[#ababab] rounded-xl border-none focus:outline-none"
                />
              </label>
            </div>

            {/* Plan */}
            <div className="flex max-w-[480px] flex-wrap gap-4 px-4 py-3">
              <label className="flex flex-col min-w-40 flex-1">
                <p className="text-white text-base font-medium pb-2">
                  Membership
                </p>
                <select
                  name="membershipPlan"
                  value={formData.membershipPlan}
                  onChange={handleChange}
                  className="w-full h-14 p-4 text-white bg-[#303030] rounded-xl border-none focus:outline-none"
                >
                  <option value="">Select Plan</option>
                  {plans.map((plan) => (
                    <option key={plan._id} value={plan._id}>
                      {plan.name} - {plan.period} - ₹{plan.price}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            {/* Submit Button */}
            <div className="flex px-4 py-3">
              <button
                onClick={handleSubmit}
                className="min-w-[84px] h-10 px-4 rounded-full bg-black text-white text-sm font-bold tracking-wide"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
