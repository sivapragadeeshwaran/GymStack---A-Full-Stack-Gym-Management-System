import { useEffect, useState } from "react";
import axiosInstance from "../../services/axiosInstance"; // adjust path
import {useNavigate } from "react-router-dom";

export default function Profile() {
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
    <div className="px-4 sm:px-6 md:px-10 lg:px-20 flex flex-1 justify-center py-5">
      <div className="layout-content-container flex flex-col max-w-[960px] w-full flex-1">
        {/* Header */}
        <div className="flex flex-wrap justify-between gap-3 p-4">
          <p className="text-white tracking-light text-[32px] font-bold leading-tight min-w-72">
            Welcome back, {profile.username}
          </p>
        </div>

        {/* User Info Title */}
        <h2 className="text-white text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
          User Information
        </h2>

        {/* User Info Grid */}
        <div className="p-4 grid grid-cols-1 sm:grid-cols-2">
          <div className="flex flex-col gap-1 border-t border-solid border-t-[#4d4d4d] py-4 pr-2">
            <p className="text-[#adadad] text-sm font-normal leading-normal">Username</p>
            <p className="text-white text-sm font-normal leading-normal">{profile.username}</p>
          </div>
          <div className="flex flex-col gap-1 border-t border-solid border-t-[#4d4d4d] py-4 pl-2">
            <p className="text-[#adadad] text-sm font-normal leading-normal">Age</p>
            <p className="text-white text-sm font-normal leading-normal">{profile.age}</p>
          </div>
          <div className="flex flex-col gap-1 border-t border-solid border-t-[#4d4d4d] py-4 pr-2">
            <p className="text-[#adadad] text-sm font-normal leading-normal">Membership Status</p>
            <p className="text-white text-sm font-normal leading-normal">{profile.membershipStatus}</p>
          </div>
          <div className="flex flex-col gap-1 border-t border-solid border-t-[#4d4d4d] py-4 pl-2">
            <p className="text-[#adadad] text-sm font-normal leading-normal">Personal Trainer</p>
            <p className="text-white text-sm font-normal leading-normal">{profile.personalTrainer}</p>
          </div>
        </div>

        {/* Membership Title */}
        <h2 className="text-white text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
          Gym Membership Details
        </h2>

        {/* Membership Details */}
        <div className="p-4">
          <div className="flex flex-col md:flex-row items-stretch justify-between gap-4 rounded-xl">
            {/* Text section */}
            <div className="flex flex-[2_2_0px] flex-col gap-4">
              <div className="flex flex-col gap-1">
                <p className="text-white text-base font-bold leading-tight">
                  {profile.membership.name}
                </p>
                <div className="py-4">
                  <div className="flex justify-between py-2">
                    <p className="text-[#adadad] text-sm font-normal leading-normal">Start Date</p>
                    <p className="text-white text-sm font-normal leading-normal text-right pr-[10px]">
                      {profile.membership.startDate
                        ? new Date(profile.membership.startDate).toLocaleDateString()
                        : "-"}
                    </p>
                  </div>
                  <div className="flex justify-between py-2">
                    <p className="text-[#adadad] text-sm font-normal leading-normal">Expiry Date</p>
                    <p className="text-white text-sm font-normal leading-normal text-right pr-[10px]">
                      {profile.membership.expiryDate
                        ? new Date(profile.membership.expiryDate).toLocaleDateString()
                        : "-"}
                    </p>
                  </div>
                  <div className="flex py-4 justify-start">
                    <button onClick={() => navigate("/userpanel/add-membership")}
                     className="flex transition active:scale-95 mt-[10px] min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-3 bg-black text-white text-sm font-bold leading-normal tracking-[0.015em]">
                      <span className="truncate">Renew Membership</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Image section */}
            <div
              className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-xl flex-1"
              style={{
                backgroundImage:
                  'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDtmATgnsogt7AissRWRS2ZbzQ4E3prfOAI6e2uNBWvDpngJMsbBJX6E4Vdl1QgtxHhphp_lHBu2YrIp6ikvJvm_lYVlSuwjpNcQ-q2jOSsCMm7SU6zcQa9bRtMUUyOSiGEQkmMF-B3lh49OMyNojFl_-xce2exTGA237SpSGjOXPXIKhSElBPH54knD4s869Q9Zu-D7dLcnjmB1xp8BIQ_BBDGFmCpnQAtJcryGS3r453Su8Bqw48TChrKf0cV8O17MSD2srNCLuFi")',
              }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}
