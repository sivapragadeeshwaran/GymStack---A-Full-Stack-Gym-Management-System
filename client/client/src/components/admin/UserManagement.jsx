import { Pencil, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllMembers, deleteMember } from "../../API/userApi";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useNavigate } from "react-router-dom";

export default function UserManagement() {
  const [members, setMembers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const MySwal = withReactContent(Swal);
  const navigate = useNavigate();

  const filteredMembers = members.filter((member) =>
    member.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    async function fetchMembers() {
      try {
        const res = await getAllMembers();
        const fetched = res?.data?.data || [];
        setMembers(fetched);
      } catch (err) {
        console.error("Failed to fetch members", err);
      }
    }

    fetchMembers();
  }, []);

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      background: "#1e1e1e",
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
        await deleteMember(id);
        setMembers((prev) => prev.filter((member) => member._id !== id));

        await Swal.fire({
          title: "Deleted!",
          text: "Member has been deleted.",
          icon: "success",
          background: "#1e1e1e",
          color: "#fff",
        });
      } catch (err) {
        console.error("Delete failed", err);
        Swal.fire({
          title: "Error!",
          text: "Failed to delete the member.",
          icon: "error",
          background: "#1e1e1e",
          color: "#fff",
        });
      }
    }
  };

  return (
    <div className="flex justify-center px-4 md:px-20 py-5 bg-[#141414] min-h-screen">
      <div className="flex flex-col flex-1 w-full max-w-[960px]">
        {/* Heading */}
        <div className="flex flex-wrap justify-between gap-3 p-4">
          <p className="text-white text-2xl md:text-[32px] font-bold leading-tight">
            Members
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col md:flex-row justify-between gap-3 px-4 py-6">
          <input
            placeholder="Search members"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="h-10 px-4 rounded-full bg-[#303030] text-white text-sm font-bold tracking-wide w-full md:max-w-[540px]"
          />
          <Link to="/adminpanel/addmember">
            <button className="h-10 px-4 transition active:scale-95 rounded-full bg-black border-2 border-[#474747] text-white text-sm font-bold tracking-wide w-full md:w-auto">
              <span className="truncate">Add Member</span>
            </button>
          </Link>
        </div>

        {/* Table */}
        <div className="px-4 py-3 w-full">
          <div className="overflow-x-auto rounded-xl border border-[#474747] bg-[#141414]">
            <table className="w-full min-w-[800px]">
              <thead>
                <tr className="bg-[#212121]">
                  <th className="px-4 py-3 text-left text-white text-sm font-medium">
                    Name
                  </th>
                  <th className="px-4 py-3 text-left text-white text-sm font-medium">
                    Phone
                  </th>
                  <th className="px-4 py-3 text-left text-white text-sm font-medium">
                    Package
                  </th>
                  <th className="px-4 py-3 text-left text-white text-sm font-medium">
                    Joining Date
                  </th>
                  <th className="px-4 py-3 text-left text-white text-sm font-medium">
                    Expiry Date
                  </th>
                  <th className="px-4 py-3 text-left text-white text-sm font-medium">
                    Paid Amount
                  </th>
                  <th className="px-4 py-3 text-left text-[#ababab] text-sm font-medium">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredMembers.length > 0 ? (
                  filteredMembers.map((member) => (
                    <tr key={member._id} className="border-t border-[#474747]">
                      <td className="px-4 py-6 text-white text-sm font-normal">
                        {member.username}
                      </td>
                      <td className="px-4 py-6 text-[#ababab] text-sm font-normal">
                        {member.phone}
                      </td>
                      <td className="px-4 py-6 text-[#ababab] text-sm font-normal">
                        {" "}
                        {member.membershipPlan?.name || "N/A"}
                      </td>
                      <td className="px-4 py-6 text-[#ababab] text-sm font-normal">
                        {member.feePaidDate
                          ? new Date(member.feePaidDate).toLocaleDateString()
                          : "N/A"}
                      </td>
                      <td className="px-4 py-6 text-[#ababab] text-sm font-normal">
                        {member.membershipExpiryDate
                          ? new Date(
                              member.membershipExpiryDate
                            ).toLocaleDateString()
                          : "N/A"}
                      </td>
                      <td className="px-4 py-6 text-[#ababab] text-sm font-normal">
                        {" "}
                        ₹{member.membershipPlan?.price || "0"}
                      </td>
                      <td className="px-4 py-6 text-[#ababab] text-sm font-bold tracking-wide">
                        <button
                          onClick={() =>
                            navigate(`/adminpanel/updatemember/${member._id}`)
                          }
                          className="mr-3 transition active:scale-90"
                        >
                          <Pencil
                            size={18}
                            className="text-white hover:text-yellow-400"
                          />
                        </button>
                        <button
                          onClick={() => handleDelete(member._id)}
                          className="transition active:scale-90"
                        >
                          <Trash2
                            size={18}
                            className="text-white hover:text-red-500"
                          />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="7"
                      className="text-center py-6 text-white text-sm"
                    >
                      No members found.
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
