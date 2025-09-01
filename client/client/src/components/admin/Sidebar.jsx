import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Menu,
  X,
  LayoutDashboard,
  Users,
  Dumbbell,
  Package,
  MessageCircle,
  ShieldCheck,
  LogOut,
} from "lucide-react";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import { useAuth } from "../../services/authService";
// ✅ fixed import

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { logout } = useAuth();

  const navItems = [
    {
      label: "Dashboard",
      icon: <LayoutDashboard size={20} />,
      to: "/adminpanel",
    },
    { label: "Members", icon: <Users size={20} />, to: "/adminpanel/members" },
    {
      label: "Trainers",
      icon: <Dumbbell size={20} />,
      to: "/adminpanel/trainers",
    },
    { label: "Plans", icon: <Package size={20} />, to: "/adminpanel/plans" },
    {
      label: "Messages",
      icon: <MessageCircle size={20} />,
      to: "/adminpanel/messages",
    },
    {
      label: "Admin Details",
      icon: <ShieldCheck size={20} />,
      to: "/adminpanel/admins",
    },
  ];

  const handleLogout = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to logout?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, Logout",
      color: "#fff",
      customClass: {
        popup: "swal-small",
        title: "swal-small-title",
        htmlContainer: "swal-small-text",
        confirmButton: "swal-small-btn",
      },
      background: "#1a1a1a",
    });

    if (result.isConfirmed) {
      logout();
      navigate("/login");
    }
  };

  return (
    <>
      {/* Mobile Top Bar */}
      <div className="md:hidden p-4 bg-[#1a1a1a] text-white flex justify-between items-center">
        <h2 className="text-xl font-bold">Admin Panel</h2>
        <button onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`bg-[#212121] text-white w-64 min-h-screen p-4 
        fixed md:static top-0 left-0 z-50 transform transition-transform duration-300 
        flex flex-col justify-between
        ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        <div>
          <h2 className="flex justify-between items-center  px-8 pt-2 pb-3 border-b border-gray-700 text-xl font-bold hidden md:block mb-4">
            Admin Panel
          </h2>
          <nav className="flex flex-col gap-4">
            {navItems.map((item, index) => (
              <Link
                key={index}
                to={item.to}
                className="flex items-center gap-3 hover:bg-[#2a2a2a] px-3 py-2 rounded"
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>
        </div>

        {/* Logout Button at Bottom */}
        <div className="pt-3 border-t border-gray-700">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full hover:bg-[#2a2a2a] px-3 py-2 rounded text-left "
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 md:hidden z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;
