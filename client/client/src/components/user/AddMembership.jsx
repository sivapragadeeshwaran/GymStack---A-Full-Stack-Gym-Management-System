import axiosInstance from "../../services/axiosInstance";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useAuth } from "../../services/authService";


export default function AddMembership() {
  const [plans, setPlans] = useState([]);
  const [selectedPlanId, setSelectedPlanId] = useState(null);
   const [isProcessing, setIsProcessing] = useState(false);
   const { authUser, login } = useAuth();

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

    const handlePay = async () => {
  if (!selectedPlanId || isProcessing) return;
  setIsProcessing(true);

  try {
    const res = await axiosInstance.post("/api/user/upgrade", {
      newPlanId: selectedPlanId,
      forceUpgrade: false,
    });

    // ✅ Success case
    await Swal.fire({
      icon: "success",
      title: "Success!",
      text: "Membership upgraded successfully!",
      confirmButtonColor: "#0bda0b",
       color: "#fff",
        customClass: {
    popup: 'swal-small',
    title: 'swal-small-title',
    htmlContainer: 'swal-small-text',
    confirmButton: 'swal-small-btn',
    cancelButton: 'swal-small-btn',
  },
    });


      login({
      ...authUser,
      assignedTrainerId: null,
      membershipPlan: selectedPlanId,
      feeStatus: "Paid",
    });

  } catch (err) {
    if (err.response?.data?.canUpgrade) {
      // 🛑 Membership still active, ask user to confirm override
      const result = await Swal.fire({
        title: "Upgrade Plan?",
        text: `Your current membership is active for ${err.response.data.daysRemaining} more day(s). Do you want to cancel and upgrade now?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, upgrade",
        cancelButtonText: "No",
        reverseButtons: true,
        confirmButtonColor: "#0bda0b",
        cancelButtonColor: "#d33",
        color: "#fff",
        customClass: {
    popup: 'swal-small',
    title: 'swal-small-title',
    htmlContainer: 'swal-small-text',
    confirmButton: 'swal-small-btn',
    cancelButton: 'swal-small-btn',
  }
      });

      if (result.isConfirmed) {
        try {
          const forceRes = await axiosInstance.post("/api/user/upgrade", {
            newPlanId: selectedPlanId,
            forceUpgrade: true,
          });

          await Swal.fire({
            icon: "success",
            title: "Upgraded!",
            text: "Membership upgraded successfully!",
            confirmButtonColor: "#0bda0b",
            color: "#fff",
        customClass: {
    popup: 'swal-small',
    title: 'swal-small-title',
    htmlContainer: 'swal-small-text',
    confirmButton: 'swal-small-btn',
    cancelButton: 'swal-small-btn',
  }
          });



          login({
            ...authUser,
            assignedTrainerId: null,
            membershipPlan: selectedPlanId,
            feeStatus: "Paid",
          });

        } catch (upgradeErr) {
          console.error("Upgrade error:", upgradeErr);
          await Swal.fire({
            icon: "error",
            title: "Upgrade Failed",
            text: "Something went wrong while upgrading.",
            color: "#fff",
        customClass: {
    popup: 'swal-small',
    title: 'swal-small-title',
    htmlContainer: 'swal-small-text',
    confirmButton: 'swal-small-btn',
    cancelButton: 'swal-small-btn',
  }
          });
        }
      }
    } else {
      await Swal.fire({
        icon: "error",
        title: "Error",
        text: err.response?.data?.message || "An error occurred.",
        color: "#fff",
        customClass: {
    popup: 'swal-small',
    title: 'swal-small-title',
    htmlContainer: 'swal-small-text',
    confirmButton: 'swal-small-btn',
    cancelButton: 'swal-small-btn',
  }
      });
    }
  } finally {
    setIsProcessing(false);
  }
};

  return (
    <div className="px-4 py-5">
      <div className="flex flex-wrap justify-between gap-3 p-4">
        <p className="text-white tracking-light text-[32px] font-bold leading-tight min-w-72">
          Membership
        </p>
      </div>

      <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <label
            key={plan._id}
            className={`relative border-2 rounded-xl overflow-hidden flex flex-col items-stretch justify-end pt-[132px] bg-cover bg-center bg-no-repeat cursor-pointer transition ${
              selectedPlanId === plan._id ? "border-[#0bda0b]" : "border-[#474747]"
            }`}
            style={{
              backgroundImage:
                "url('https://png.pngtree.com/thumb_back/fh260/background/20230630/pngtree-dark-fitness-room-with-training-equipment-and-black-dumbbells-on-the-image_3698810.jpg')",
            }}
          >
            {/* Radio button */}
            <input
              type="radio"
              name="membership"
              value={plan._id}
              checked={selectedPlanId === plan._id}
              onChange={() => setSelectedPlanId(plan._id)}
              className="absolute left-4 top-4 w-5 h-5"
              style={{ accentColor: "#0bda0b" }}
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>

            {/* Content */}
            <div className="relative z-10 flex w-full items-end justify-between gap-4 p-4">
              <div className="flex max-w-[440px] flex-1 flex-col gap-1 px-2 pt-2">
                <p className="text-white text-2xl font-bold leading-tight max-w-[440px]">
                  {plan.name}
                </p>
                <p className="text-white text-base font-medium leading-normal">
                  {plan.period} | ₹{plan.price}
                </p>
                  {plan.includesPersonalTraining && (
    <span className="inline-block  py-[2px] text-xs font-semibold text-white rounded-full w-fit">
     {"\u2705"} Includes Personal Training
    </span>
  )}
              </div>
            </div>
          </label>
        ))}
      </div>

      {/* Pay Button */}
      <div className="flex px-4 py-3 justify-center">
        <button
          disabled={!selectedPlanId || isProcessing}
          onClick={handlePay}
          className={`flex min-w-[300px] max-w-[700px] border-2 cursor-pointer items-center justify-center overflow-hidden rounded-full h-12 px-4 text-white text-sm font-bold leading-normal tracking-[0.015em] 
            ${
            selectedPlanId
              ? "text-[#0bda0b] border-[#0bda0b] "
              : "bg-black border-[#474747] cursor-not-allowed"
          }`}
        >
          <span className={ ` truncate ${
            selectedPlanId
              ? "text-[#0bda0b] "
              : "text-white"
          }` }>Pay</span>
        </button>
      </div>
    </div>
  );
}
