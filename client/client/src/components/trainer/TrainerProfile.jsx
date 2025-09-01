import { useEffect, useState, useRef } from "react";
import axiosInstance from "../../services/axiosInstance";
import { Pencil } from "lucide-react";
import { toast } from "react-toastify";

export default function TrainerProfile() {
  const [trainer, setTrainer] = useState(null);
  const fileInputRef = useRef(null);
  const cloudName = import.meta.env.VITE_CLOUD_NAME;
  const uploadPreset = import.meta.env.VITE_UPLOAD_PRESET;

  useEffect(() => {
    const fetchTrainerData = async () => {
      try {
        const response = await axiosInstance.get("/api/trainerProfile/profile");
        if (response.data.success) {
          setTrainer(response.data.data);
        } else {
          console.error("Trainer not found");
        }
      } catch (error) {
        console.error("Error fetching trainer data:", error.message);
      }
    };

    fetchTrainerData();
  }, []);

  if (!cloudName || !uploadPreset) {
    toast.error("Cloudinary config missing. Check .env setup.");
    return;
  }

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset); // ✅ Replace with your Cloudinary preset
    formData.append("folder", "trainer_profiles");

    try {
      // Upload to Cloudinary
      const cloudRes = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const cloudData = await cloudRes.json();

      if (!cloudData.secure_url) {
        throw new Error("Image upload failed");
      }

      // Update trainer profile picture in backend
      const res = await axiosInstance.put(
        `/api/trainerProfile/trainer/${trainer._id}`,
        {
          profilePic: cloudData.secure_url,
        }
      );

      if (res?.data?.success) {
        toast.success("Profile picture updated!");
        setTrainer((prev) => ({ ...prev, profilePic: cloudData.secure_url }));
      } else {
        console.error("Unexpected response:", res);
        toast.error("Failed to update profile picture.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Image upload failed.");
    }
  };

  return (
    <div className="px-6 sm:px-10 md:px-20 lg:px-32 py-6 min-h-screen bg-[#0f0f0f] text-white">
      <div className="max-w-5xl mx-auto flex flex-col gap-6">
        {/* Profile Header */}
        <div className="flex flex-col items-center gap-6 text-center bg-[#1a1a1a] rounded-2xl shadow-lg p-6 sm:p-8 border border-[#2a2a2a]">
          {/* Profile Picture with Gradient Ring */}
          <div className="relative w-32 h-32">
            <div className="relative w-32 h-32">
              {/* Gradient Border */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500 via-purple-600 to-pink-500 p-[2px]">
                <div
                  className="w-full h-full rounded-full bg-cover bg-center"
                  style={{
                    backgroundImage: `url(${
                      trainer?.profilePic ||
                      "https://lh3.googleusercontent.com/aida-public/AB6AXuAbFEPcOjMEGwjFcvtmUykCd6RQ-58RtoqYEuMVq_4Fwph6xD0HXpikug7CN5VGplu6oKn7Gycq312tRBuIEjYvWFqv1m-b30xWWY6XrFMovBsgUomTEAnbevnNn7oSCSBDuRH_NPMnk2lWaPWNiOrVcH_3EGZD27900WWgkbeP0JdD9JlJQ12HrQd4QfePeGdfYWHYv3D_R99k21QzFb1EaMQD5ZLMqnhsWzrtfFsnzcVfu_Xn7Ac-f0C2vhVv4ZPfMbKwTQvQimQ"
                    })`,
                  }}
                />
              </div>

              {/* Edit Icon */}
              <button
                className="absolute -bottom-1 -right-1 bg-[#1e1e2f] border border-[#333] p-1 rounded-full hover:bg-blue-600 transition-all"
                title="Edit Profile Picture"
                onClick={handleImageClick}
              >
                <Pencil className="w-4 h-4 text-white" />
              </button>

              <input
                type="file"
                ref={fileInputRef}
                style={{ display: "none" }}
                accept="image/*"
                onChange={handleFileChange}
              />
            </div>
          </div>

          {/* Trainer Info */}
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
              {trainer ? <p>{trainer.name}</p> : <p>Loading profile...</p>}
            </h1>
            <p className="text-sm text-[#bbbbbb] mt-1">
              Certified Fitness Trainer
            </p>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-3 mt-2">
            <span className="text-xs sm:text-sm bg-[#2c2c2c] font-medium text-white px-4 py-1.5 rounded-full border border-[#3a3a3a]">
              {trainer ? (
                <p>{trainer.experience}+</p>
              ) : (
                <p>Loading profile...</p>
              )}{" "}
              Years Experience
            </span>
            <span className=" pt-[16px] text-xs sm:text-sm bg-[#2c2c2c] font-medium text-white px-4 py-1.5 rounded-full border border-[#3a3a3a]">
              {trainer ? (
                <p>{trainer.specialization}</p>
              ) : (
                <p>Loading profile...</p>
              )}
            </span>
            <span className="text-xs sm:text-sm bg-[#2c2c2c]  text-white px-4 py-1.5 rounded-full font-medium">
              {trainer ? (
                <p>{trainer.assignedMembers.length}</p>
              ) : (
                <p>Loading profile...</p>
              )}{" "}
              Assigned Members
            </span>
          </div>
        </div>

        {/* Section Title */}
        <h2 className="text-xl font-semibold text-white border-b border-[#2a2a2a] pb-2 px-1">
          Trained Members
        </h2>

        {/* Member Table */}
        <div className="overflow-auto">
          <div className="rounded-xl overflow-hidden border border-[#2e2e2e] bg-[#141414] shadow-md">
            <table className="min-w-full text-sm text-left">
              <thead className="bg-[#1f1f1f] text-white">
                <tr>
                  <th className="px-4 py-3 hidden sm:table-cell">#</th>
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3 hidden md:table-cell">Phone</th>
                  <th className="px-4 py-3 hidden lg:table-cell">Age</th>
                </tr>
              </thead>
              <tbody className="text-[#cccccc] divide-y divide-[#2e2e2e]">
                {trainer?.assignedMembers &&
                trainer.assignedMembers.length > 0 ? (
                  trainer.assignedMembers.map((member, index) => (
                    <tr
                      key={member._id || index}
                      className="hover:bg-[#1e1e2f] transition-all"
                    >
                      <td className="px-4 py-3 hidden sm:table-cell">
                        {index + 1}
                      </td>
                      <td className="px-4 py-3 text-white font-medium">
                        {member.username || "N/A"}
                      </td>
                      <td className="px-4 py-3 hidden md:table-cell">
                        {member.phone || "N/A"}
                      </td>
                      <td className="px-4 py-3 hidden lg:table-cell">
                        {member.dateOfBirth
                          ? new Date().getFullYear() -
                            new Date(member.dateOfBirth).getFullYear()
                          : "N/A"}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="4"
                      className="px-4 py-3 text-center text-white"
                    >
                      No assigned members
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
