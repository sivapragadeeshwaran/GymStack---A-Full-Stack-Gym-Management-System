import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../services/authService";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import {
  User,
  CalendarPlus,
  Calendar,
  UserPlus,
  LogOut,
  Menu,
  MessageCircle,
  X,
} from "lucide-react";

export default function UserSidebar() {
  const [isOpen, setIsOpen] = useState(false);
   const navigate = useNavigate();
  const { logout } = useAuth(); 

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-2 rounded-md transition-all  hover:bg-[#1e1e2f] `;

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const closeSidebar = () => {
    setIsOpen(false);
  };

 const handleLogout = () => {
   Swal.fire({
     title: "Are you sure?",
     text: "You will be logged out!",
     icon: "warning",
     showCancelButton: true,
     confirmButtonColor: "#3085d6",
     cancelButtonColor: "#d33",
     confirmButtonText: "Yes, logout!",
     color: "#fff",
     customClass: {
       popup: 'swal-small',
       title: 'swal-small-title',
       htmlContainer: 'swal-small-text',
       confirmButton: 'swal-small-btn',
       cancelButton: 'swal-small-btn',
     }
   }).then((result) => {
     if (result.isConfirmed) {
       logout();
       Swal.fire({
         title: "Logged out!",
         text: "You have been logged out.",
         icon: "success",
         color: "#fff",
         customClass: {
           popup: 'swal-small',
           title: 'swal-small-title',
           htmlContainer: 'swal-small-text',
           confirmButton: 'swal-small-btn',
         }
       });
       navigate("/login");
     }
   });
 };

  return (
    <>
      {/* Hamburger Button - visible only on small screens */}
     {/* Topbar for small screens */}
<div className="md:hidden fixed top-0 left-0 w-full h-14 bg-[#141414] text-white flex items-center justify-between px-4 z-50 mb-20 shadow-md">
  {/* Hamburger icon */}
  <button onClick={toggleSidebar} className="p-1">
    <Menu className="w-6 h-6" />
  </button>

  {/* Title or Welcome text */}


  {/* Optional: Profile or Logout icon */}
  <button onClick={() => {}} className="p-1">
    <User className="w-6 h-6" />
  </button>
</div>


      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 z-50 h-screen w-60 bg-[#141414] text-white flex flex-col justify-between shadow-md transform transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:relative md:flex`}
      >
        {/* Top */}
        <div>
          <div className="p-5 text-2xl font-bold text-center border-b border-gray-700 flex justify-between items-center">
            User Panel
            {/* Close Icon (small screen only) */}
            <button className="md:hidden" onClick={closeSidebar}>
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Nav Links */}
          <nav className="flex flex-col gap-4 p-4">
            <NavLink to="/userpanel" className={linkClass} onClick={closeSidebar}>
              <User className="w-5 h-5" />
              <span>Profile</span>
            </NavLink>
            <NavLink to="/userpanel/add-membership" className={linkClass} onClick={closeSidebar}>
              <CalendarPlus className="w-5 h-5" />
              <span>Add Membership</span>
            </NavLink>
            <NavLink to="/userpanel/add-trainer" className={linkClass} onClick={closeSidebar}>
              <UserPlus className="w-5 h-5" />
              <span>Add Trainer</span>
            </NavLink>
            <NavLink to="/userpanel/class-schedule" className={linkClass} onClick={closeSidebar}>
              <Calendar className="w-5 h-5" />
              <span>Class Schedule</span>
            </NavLink>
            <NavLink to="/userpanel/messages" className={linkClass} onClick={closeSidebar}>
              <MessageCircle className="w-5 h-5" />
              <span>Messages</span>
            </NavLink>
          </nav>
        </div>

        {/* Bottom */}
        <div className="p-4 border-t border-gray-700">
          <button
            className="flex items-center gap-3 px-4 py-2 w-full text-left hover:bg-[#1e1e2f] rounded-md"
            onClick={() => {
              closeSidebar();
              handleLogout();
              // add logout logic here
            }}
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </>
  );
}
