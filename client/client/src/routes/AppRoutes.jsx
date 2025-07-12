import { Routes, Route, Navigate } from "react-router-dom";
import Register from "../pages/Register";
import Login from "../pages/Login";
import UserPanel from "../pages/UserPanel";
import AdminPanel from "../pages/UserPanel";
import TrainerPanel from "../pages/UserPanel";

export default function AppRoutes(){
    return(
     <Routes>
        <Route path="/register" element={<Register />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/userpanel" element={<UserPanel />}/>
        <Route path="/adminpanel" element={<AdminPanel />}/>
        <Route path="/trainerpanel" element={<TrainerPanel />}/>
     </Routes>
    )
}