import { Pencil, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosInstance from "../../services/axiosInstance";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';

export default function TrainerManagement(){
  const [trainers, setTrainers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();


  const filteredTrainers = trainers.filter((trainer) =>
  trainer.name.toLowerCase().includes(searchTerm.toLowerCase())
);



    const fetchTrainers = async () => {
    try {
      const res = await axiosInstance.get("/api/trainers/");
      if (res.data.success && Array.isArray(res.data.data)) {
            setTrainers(res.data.data);
       } else {
           console.error("Unexpected API response:", res.data);
          }
    } catch (error) {
      console.error("Error fetching trainers", error);
    }
  };


  const handleDelete = async (id) => {
  const result = await Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Yes, delete it!",
    color: "#fff",
         customClass: {
    popup: 'swal-small',
    title: 'swal-small-title',
    htmlContainer: 'swal-small-text',
    confirmButton: 'swal-small-btn',
    cancelButton: 'swal-small-btn',
  },
  });

  if (!result.isConfirmed) return;

  try {
    await axiosInstance.delete(`/api/trainers/${id}`);
    fetchTrainers(); // Refresh list

    Swal.fire({
      title: "Deleted!",
      text: "Trainer has been deleted.",
      icon: "success",
      timer: 1500,
      showConfirmButton: false,
      color: "#fff",
           customClass: {
    popup: 'swal-small',
    title: 'swal-small-title',
    htmlContainer: 'swal-small-text',
    confirmButton: 'swal-small-btn',
    cancelButton: 'swal-small-btn',
  },

    });
  } catch (error) {
    console.error("Error deleting trainer", error);

    Swal.fire({
      title: "Error!",
      text: "Failed to delete trainer.",
      icon: "error",
       color: "#fff",
           customClass: {
    popup: 'swal-small',
    title: 'swal-small-title',
    htmlContainer: 'swal-small-text',
    confirmButton: 'swal-small-btn',
    cancelButton: 'swal-small-btn',
  },
    });
  }
};


   useEffect(() => {
    fetchTrainers();
  }, []);


    return (
 <div className="px-4 h-full flex flex-1 justify-center py-5 bg-[#141414] overflow-x-hidden">
  <div className="layout-content-container flex flex-col max-w-[960px] w-full flex-1">
    
    {/* Heading */}
    <div className="flex flex-wrap justify-between gap-3 p-4">
      <p className="text-white text-[32px] font-bold leading-tight min-w-72 tracking-light">Trainers</p>
    </div>

    {/* Search & Add */}
    <div className="py-3">
      <div className="flex flex-col md:flex-row justify-between gap-3 px-4 py-3">
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search trainer"
          className="h-10 px-4 rounded-full bg-[#303030] text-white text-sm font-bold tracking-wide w-full md:max-w-[540px]"
        />
        <Link to="/adminpanel/addtrainer">
          <button className="h-10 px-4 transition active:scale-95 rounded-full bg-black border-2 border-[#474747] text-white text-sm font-bold tracking-wide w-full md:w-auto">
            <span className="truncate">Add Trainer</span>
          </button>
        </Link>
      </div>
    </div>

    {/* Table */}
    <div className="px-4 py-3 overflow-x-auto">
      <div className="w-full min-w-[768px] md:min-w-full">
        <div className="overflow-x-auto rounded-xl border border-[#474747] bg-[#141414]">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-[#212121]">
                <th className="px-4 py-3 text-left text-white min-w-[180px] text-sm font-medium leading-normal">Name</th>
                <th className="px-4 py-3 text-left text-white min-w-[180px] text-sm font-medium leading-normal">Phone</th>
                <th className="px-4 py-3 text-left text-white min-w-[180px] text-sm font-medium leading-normal">Experience</th>
                <th className="px-4 py-3 text-left text-white min-w-[180px] text-sm font-medium leading-normal">Specialization</th>
                <th className="px-4 py-3 text-left text-[#ababab] min-w-[140px] text-sm font-medium leading-normal">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredTrainers.map((trainer, index) => (
                <tr key={index} className="border-t border-[#474747]">
                  <td className="h-[72px] px-4 py-2 text-white text-sm font-normal leading-normal">
                    {trainer.name}
                  </td>
                  <td className="h-[72px] px-4 py-2 text-[#ababab] text-sm font-normal leading-normal">
                    {trainer.userId.phone}
                  </td>
                  <td className="h-[72px] px-4 py-2 text-[#ababab] text-sm font-normal leading-normal">
                    {trainer.experience}
                  </td>
                  <td className="h-[72px] px-4 py-2 text-[#ababab] text-sm font-normal leading-normal">
                    {trainer.specialization}
                  </td>
                  <td className="h-[72px] px-4 py-2 text-[#ababab] text-sm font-bold leading-normal tracking-[0.015em]">
                    <div className="flex">
                      <button onClick={() => navigate(`/adminpanel/updatetrainer/${trainer._id}`)} className="mr-3 transition active:scale-90">
                        <Pencil size={18} className="text-white hover:text-yellow-400" />
                      </button>
                      <button onClick={() => handleDelete(trainer._id)} className="transition active:scale-90">
                        <Trash2 size={18} className="text-white hover:text-red-500" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    
  </div>
</div>

    )
}