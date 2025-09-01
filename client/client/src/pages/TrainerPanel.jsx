import { Routes, Route, Outlet } from "react-router-dom";
import Sidebar from "../components/trainer/Siderbar";

function TrainerPanel() {
  return (
  <div className="flex">
        <Sidebar />
        <div className="mt-14 md:mt-0 flex-1 h-screen overflow-y-auto bg-[#0f0f0f] text-white ">
         <Outlet />
        </div>
        
      </div>
  );
}

export default TrainerPanel;
