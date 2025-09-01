import { Routes, Route, Outlet } from "react-router-dom";
import Sidebar from "../components/user/Sidebar";
import Profile from "../components/user/Profile";

export default function UserPanel() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="mt-14 md:mt-0 flex-1 h-screen overflow-y-auto bg-[#0f0f0f] text-white ">
       <Outlet />
      </div>
      
    </div>
  );
}
