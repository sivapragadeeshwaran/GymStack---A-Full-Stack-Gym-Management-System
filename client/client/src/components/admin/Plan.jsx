import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../services/axiosInstance"; // adjust the path to your axios setup
import { toast } from "react-toastify";

export default function Plan() {
  const navigate = useNavigate();
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const res = await axiosInstance.get("/api/plans/");
        if (res.data.success) {
          setPlans(res.data.data);
        }
      } catch (error) {
        console.error("Error fetching plans:", error);
      }
    };

    fetchPlans();
  }, []);

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This action will delete the plan permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      color: "#fff",
      customClass: {
        popup: "swal-small",
        title: "swal-small-title",
        htmlContainer: "swal-small-text",
        confirmButton: "swal-small-btn",
        cancelButton: "swal-small-btn",
      },
    });

    if (result.isConfirmed) {
      try {
        const res = await axiosInstance.delete(`/api/plans/${id}`);
        if (res.data.success) {
          toast.success("Plan deleted successfully");
          setPlans((prev) => prev.filter((p) => p._id !== id));
          // fetchPlans();

          await Swal.fire({
            title: "Deleted!",
            text: "The plan has been deleted.",
            icon: "success",
            timer: 1500,
            color: "#fff",
            showConfirmButton: false,
            customClass: {
              popup: "swal-small",
              title: "swal-small-title",
              htmlContainer: "swal-small-text",
              confirmButton: "swal-small-btn",
              cancelButton: "swal-small-btn",
            },
          });
        }
      } catch (err) {
        console.error("Error deleting plan:", err);
        toast.error("Server error while deleting plan");
      }
    }
  };

  return (
    <div className="px-4 h-full flex flex-1 justify-center py-5 bg-[#141414]">
      <div className="flex flex-col max-w-[960px] flex-1">
        {/* Header */}
        <div className="flex flex-wrap justify-between gap-3 p-4">
          <p className="text-white tracking-light text-[32px] font-bold leading-tight min-w-72">
            Membership Plans
          </p>
          <button
            onClick={() => navigate("/adminpanel/addplan")}
            className="flex border-2 border-[#474747] min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 bg-black text-white text-sm font-medium leading-normal"
          >
            <span className="truncate">Add New Plan</span>
          </button>
        </div>

        {/* Membership Cards */}
        <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-6 ">
          {plans.map((plan) => (
            <div
              key={plan._id}
              className="relative border-2 transition active:scale-110 border-[#474747] rounded-xl overflow-hidden flex flex-col items-stretch justify-end pt-[132px] bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage:
                  "url('https://png.pngtree.com/thumb_back/fh260/background/20230630/pngtree-dark-fitness-room-with-training-equipment-and-black-dumbbells-on-the-image_3698810.jpg')",
              }}
            >
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>

              {/* Content */}
              <div className="relative z-10 flex w-full items-end justify-between gap-4 p-4">
                <div className="flex max-w-[440px] flex-1 flex-col gap-1 px-2 pt-2">
                  <p className="text-white text-2xl font-bold leading-tight max-w-[440px]">
                    {plan.name}
                  </p>
                  <p className="text-white text-base font-medium leading-normal">
                    {plan.period} | RS {plan.price}
                  </p>
                  {plan.includesPersonalTraining && (
                    <span className="inline-block mt-1 py-[2px] text-xs font-medium text-white  rounded-full w-fit">
                      {"\u2705"} Includes Personal Training
                    </span>
                  )}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() =>
                      navigate(`/adminpanel/updateplan/${plan._id}`)
                    }
                    className="flex border-2 border-[#474747] transition active:scale-95 min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 bg-black text-white text-sm font-bold leading-normal tracking-[0.015em]"
                  >
                    <span className="truncate">Edit</span>
                  </button>
                  <button
                    onClick={() => handleDelete(plan._id)}
                    className="flex border-2 border-[#474747] transition active:scale-95 min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 bg-black text-white text-sm font-bold leading-normal tracking-[0.015em]"
                  >
                    <span className="truncate">Delete</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
