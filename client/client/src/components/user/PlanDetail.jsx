import { useEffect, useState } from "react";
import axiosInstance from "../../services/axiosInstance";
import { useNavigate } from "react-router-dom";

export default function PlanDetail() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axiosInstance.get("/api/user/profile");
        if (res.data.success) {
          setProfile(res.data.data);
        }
      } catch (err) {
        console.error("Failed to load profile:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return <div className="text-white p-6">Loading profile...</div>;
  }

  if (!profile) {
    return <div className="text-white p-6">Failed to load profile.</div>;
  }

  return (
    <div className="px-4 pt-4 md:px-6 md:pt-6 bg-[#111] min-h-[60vh] "
    >
      <h2 className="text-white text-[22px] font-bold tracking-[-0.015em] pl-4 pb-2">
        Gym Membership Details
      </h2>

      <div className="flex flex-col md:flex-row gap-6 mt-6 px-4 ">
        {/* Membership Info Card */}
        <div className="flex-1 bg-[#1a1a1a] rounded-lg p-5 shadow-md border border-gray-800 "
        style={{
              backgroundImage:
                "url('https://png.pngtree.com/thumb_back/fh260/background/20230630/pngtree-dark-fitness-room-with-training-equipment-and-black-dumbbells-on-the-image_3698810.jpg')",
                backgroundSize: "cover",         // Makes image cover entire div
  backgroundRepeat: "no-repeat",   // Prevents tiling
  backgroundPosition: "center",
            }}
        >
          <p className="text-white text-lg font-bold mb-4">
            {profile.membership.name}
          </p>

          <div className="flex justify-between items-center py-2">
            <p className="text-[#adadad] text-sm">Start Date</p>
            <p className="text-white text-sm text-right">
              {profile.membership.startDate
                ? new Date(profile.membership.startDate).toLocaleDateString()
                : "-"}
            </p>
          </div>

          <div className="flex justify-between items-center py-2 ">
            <p className="text-[#adadad] text-sm">Expiry Date</p>
            <p className="text-[#FF0000] text-sm text-right">
              {profile.membership.expiryDate
                ? new Date(profile.membership.expiryDate).toLocaleDateString()
                : "-"}
            </p>
          </div>

          <div className="pt-5 flex md:justify-end">
            <button
              onClick={() => navigate("/userpanel/add-membership")}
              className="bg-black hover:bg-gray-900 transition active:scale-95 rounded-xl px-4 py-2 text-sm font-bold text-white shadow-sm border border-gray-700"
            >
              Renew Membership
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
