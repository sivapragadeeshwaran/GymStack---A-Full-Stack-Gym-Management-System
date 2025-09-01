import {Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosInstance from "../../services/axiosInstance"; // Adjust path as needed
import { toast } from "react-toastify";
import Swal from "sweetalert2";

export default function Admindetails(){
  const navigate = useNavigate();
    const [admins, setAdmins] = useState([]);
     const fetchAdmins = async () => {
    try {
      const res = await axiosInstance.get("/api/admins");
      if (res.data.success) {
        setAdmins(res.data.data); // Adjust based on your API response
      }
    } catch (error) {
      toast.error("Failed to fetch admins");
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);


 const handleDelete = async (id) => {
  const result = await Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
    color: "#fff",
    customClass: {
    popup: 'swal-small',
    title: 'swal-small-title',
    htmlContainer: 'swal-small-text',
    confirmButton: 'swal-small-btn',
    cancelButton: 'swal-small-btn',
  }
  });

  if (!result.isConfirmed) return;

  try {
    const res = await axiosInstance.delete(`/api/admins/${id}`);
    if (res.data.success) {
      toast.success("Admin deleted successfully");
    setAdmins((prev) => prev.filter((admin) => admin._id !== id));
        Swal.fire({
             title: "Deleted!",
             text: "Admin has been deleted.",
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
         },});
    }
  } catch (err) {
    console.error(err);
    Swal.fire("Error", "Failed to delete admin", "error");
  }
};

    return(
        <div className=" bg-[#141414] h-screen px-40 flex flex-1 justify-center py-5">
  <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
    <div className="flex flex-wrap justify-between gap-3 p-4">
      <p className="text-white tracking-light text-[32px] font-bold leading-tight min-w-72">Administrators</p>
      <button onClick={() => navigate('/adminpanel/addadmins')}
       className="flex transition active:scale-95 border-2 border-[#474747] min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-8 px-4 bg-[#303030] text-white text-sm font-medium leading-normal">
        <span className="truncate">Add admin</span>
      </button>
    </div>

    {/* Administrator Rows - Repeatable Block */}
    {admins.length === 0 ? (
          <p className="text-white">No admins found.</p>
        ) : (
          admins.map((admin, index) => (
            <div
              key={admin._id || index}
              className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-[#1e1e1e] rounded-lg px-4 py-3 mb-4"
            >
              <div className="flex items-center gap-4">
                <div className="text-white flex items-center justify-center rounded-lg bg-[#303030] shrink-0 size-12">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24px"
                    height="24px"
                    fill="currentColor"
                    viewBox="0 0 256 256"
                  >
                    <path d="M230.92,212c-15.23-26.33-38.7-45.21-66.09-54.16a72,72,0,1,0-73.66,0C63.78,166.78,40.31,185.66,25.08,212a8,8,0,1,0,13.85,8c18.84-32.56,52.14-52,89.07-52s70.23,19.44,89.07,52a8,8,0,1,0,13.85-8ZM72,96a56,56,0,1,1,56,56A56.06,56.06,0,0,1,72,96Z" />
                  </svg>
                </div>
                <div className="text-white">
                  <p className="text-base font-semibold">{admin.username}</p>
                  <p className="text-sm text-[#ababab]">
                    Phone: {admin.phone} | Email: {admin.email}
                  </p>
                </div>
              </div>
              <button
                className="transition active:scale-90 text-white hover:text-red-500"
                onClick={() => handleDelete(admin._id)}
              >
                <Trash2 size={20} />
              </button>
            </div>
          ))
        )}
  </div>
</div>

    )
}