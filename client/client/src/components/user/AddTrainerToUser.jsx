import { useEffect, useState } from "react";
import axiosInstance from "../../services/axiosInstance";
import { toast } from "react-toastify";
import { useAuth } from "../../services/authService";

export default function AddTrainerToUser() {
  const [trainers, setTrainers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [assigningTrainerId, setAssigningTrainerId] = useState(null);
  const { authUser, updateAssignedTrainer } = useAuth();

  const assignedTrainerId = authUser?.assignedTrainerId || null;

  useEffect(() => {
    const fetchTrainers = async () => {
      try {
        const res = await axiosInstance.get("/api/user/getAllTrianers"); // ✅ Update if baseURL is not set
        setTrainers(res.data.trainers);
      } catch (error) {
        console.error("Error fetching trainers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrainers();
  }, []);

  const handleAssignTrainer = async (trainerId) => {
    try {
      setAssigningTrainerId(trainerId);
      const res = await axiosInstance.post("/api/user/assignTrainerToUser", {
        trainerId,
      });
      toast.success("Trainer assigned successfully!");
      // setAssignedTrainerId(trainerId);
      updateAssignedTrainer(trainerId);
    } catch (error) {
      console.error("Error assigning trainer:", error);
      toast.error(error?.response?.data?.message || "Something went wrong.");
    } finally {
      setAssigningTrainerId(null);
    }
  };

  useEffect(() => {}, [authUser]);

  if (loading || !authUser)
    return <div className="text-white">Loading trainers...</div>;

  return (
    <div className="flex flex-1 justify-center px-4 mb-[30px]">
      <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
        {/* Title */}
        <div className="flex flex-wrap justify-between gap-3">
          <p className="text-white tracking-light text-[32px] font-bold leading-tight min-w-72">
            Add Trainer
          </p>
        </div>

        {/* Trainer Grid */}
        <div className="grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-3 py-4 ">
          {trainers.map((trainer, index) => (
            <div key={index} className="flex flex-col gap-3 pb-3 ">
              {/* Trainer Image */}
              <div
                className="w-full bg-center bg-no-repeat aspect-video bg-cover"
                style={{
                  backgroundImage: `url(${
                    trainer.profilePic ||
                    "https://img.freepik.com/free-photo/fit-cartoon-character-training_23-2151149006.jpg?semt=ais_hybrid&w=740&q=80"
                  })`,
                }}
              ></div>

              {/* Trainer Info */}
              <div className="pl-2">
                <p className="text-white text-base font-medium ">
                  {trainer.name}
                </p>

                <p className="text-[#ababab] text-sm font-normal  ">
                  {trainer.experience} years experience
                </p>
                <p className="text-[#ababab] text-sm font-normal  ">
                  {trainer.specialization}
                </p>

                <p className="text-[#ababab] text-sm font-normal ">
                  {trainer.assignedMemberCount} members
                </p>
              </div>
              <button
                onClick={() => handleAssignTrainer(trainer._id)}
                disabled={
                  assignedTrainerId !== null &&
                  assignedTrainerId !== trainer._id
                }
                className={`text-white transition active:scale-95 my-2 text-base rounded-xl font-medium border-2 w-full p-2 ${
                  assignedTrainerId === trainer._id
                    ? "bg-[#0bda0b] border-[#0bda0b] cursor-default" // ✅ Green button for selected trainer
                    : "border-gray-700 hover:bg-gray-800"
                }`}
              >
                {assignedTrainerId === trainer._id
                  ? "Your Trainer"
                  : "Add Trainer"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
