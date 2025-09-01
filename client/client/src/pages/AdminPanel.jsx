import Sidebar from "../components/admin/Sidebar";
import { Outlet } from "react-router-dom";

export default function AdminPanel(){
    return(
        <div className="flex flex-col md:flex-row min-h-screen ">
        <Sidebar />
        <main className="w-full flex-1 h-screen overflow-y-auto">
        <Outlet />
        </main>
        </div>      
    )
}