import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "../components/shared/ProtectedRoute";
import Register from "../pages/Register";
import Login from "../pages/Login";
import UserPanel from "../pages/UserPanel";
import AdminPanel from "../pages/AdminPanel";
import TrainerPanel from "../pages/TrainerPanel";
import ForgetPassword from "../pages/ForgetPassword";
import ResetPassword from "../pages/ResetPassword";
import Unauthorized from "../pages/Unauthorized";
import UserManagement from "../components/admin/UserManagement";
import TrainerManagement from "../components/admin/TrainerManagement";
import Dashboard from "../components/admin/Dashboard";
import Addmember from "../components/admin/Addmember";
import Updatemember from "../components/admin/Updatemember";
import Addtrainer from "../components/admin/Addtrainer";
import UpdateTrainer from "../components/admin/UpdateTrainer";
import Plan from "../components/admin/Plan";
import Addplan from "../components/admin/Addplan";
import Updateplan from "../components/admin/Updateplan";
import Admindetails from "../components/admin/Admindetails";
import Addadmin from "../components/admin/Addadmin";
import Profile from "../components/user/Profile";
import AddMembership from "../components/user/AddMembership";
import TrainerProfile from "../components/trainer/TrainerProfile";
import ClassSchedule from "../components/trainer/ClassSchedule";
import AddClass from "../components/trainer/AddClass";
import UpdateClass from "../components/trainer/UpdateClass";
import AddTrainerPanel from "../components/user/AddTrainerPanel";
import ClassSchedules from "../components/user/ClassSchedule";
import Home from "../pages/Home";
import Message from "../components/shared/Message";
import PublicMembershipPlans from "../pages/PublicMembershipPlans";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/userpanel"
        element={
          <ProtectedRoute allowedRoles={["user"]}>
            <UserPanel />
          </ProtectedRoute>
        }
      >
        <Route index element={<Profile />} />
        <Route path="add-membership" element={<AddMembership />} />
        <Route path="add-trainer" element={<AddTrainerPanel />} />
        <Route path="class-schedule" element={<ClassSchedules />} />
        <Route path="messages" element={<Message />} />
      </Route>
      <Route
        path="/adminpanel"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <AdminPanel />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="members" element={<UserManagement />} />
        <Route path="trainers" element={<TrainerManagement />} />
        <Route path="addmember" element={<Addmember />} />
        <Route path="updatemember/:id" element={<Updatemember />} />
        <Route path="addtrainer" element={<Addtrainer />} />
        <Route path="updatetrainer/:id" element={<UpdateTrainer />} />
        <Route path="plans" element={<Plan />} />
        <Route path="addplan" element={<Addplan />} />
        <Route path="updateplan/:id" element={<Updateplan />} />
        <Route path="admins" element={<Admindetails />} />
        <Route path="addadmins" element={<Addadmin />} />
        <Route path="messages" element={<Message />} />
      </Route>
      <Route
        path="/trainerpanel"
        element={
          <ProtectedRoute allowedRoles={["trainer"]}>
            <TrainerPanel />
          </ProtectedRoute>
        }
      >
        <Route index element={<TrainerProfile />} />
        <Route path="classschedule" element={<ClassSchedule />} />
        <Route path="addclass" element={<AddClass />} />
        <Route path="updateclass/:id" element={<UpdateClass />} />
        <Route path="messages" element={<Message />} />
      </Route>
      <Route path="/forgetpassword" element={<ForgetPassword />} />
      <Route path="/resetpassword" element={<ResetPassword />} />
      <Route path="/unauthorized" element={<Unauthorized />} />
      <Route path="/membership-plans" element={<PublicMembershipPlans />} />
    </Routes>
  );
}
