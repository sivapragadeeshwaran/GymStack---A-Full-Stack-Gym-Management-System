const express = require("express");
const dotenv = require("dotenv");
const http = require("http");
const cors = require("cors");
const database = require("./database/db");
const { setupSocket } = require("./utils/messageSocket");
const UserRouter = require("./routes/login-registor-routes");
const AdminRouter = require("./routes/admin-route");
const trainerRoutes = require("./routes/trainer-route");
const planRoutes = require("./routes/plan-route");
const AdminRoutes = require("./routes/admin-management-route");
const analyticsRoutes = require("./routes/dashboard-route");
const userRoutes = require("./routes/user-routes");
const trainerPanelRoutes = require("./routes/trainerPanel-routes");
const { setupMembershipReminderJob } = require("./cron/membershipReminder");
const contactRoutes = require("./routes/contact-route");
const messageRoutes = require("./routes/message-routes");
const path = require("path");

dotenv.config();

const app = express();
database();
const server = http.createServer(app);
setupSocket(server);

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());

app.use("/api/users", UserRouter);
app.use("/api/admin", AdminRouter);
app.use("/api/trainers", trainerRoutes);
app.use("/api/plans", planRoutes);
app.use("/api/admins", AdminRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/user", userRoutes);
app.use("/api/trainerProfile", trainerPanelRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/messages", messageRoutes);
setupMembershipReminderJob();

const clientPath = path.join(__dirname, "..", "client", "client", "dist");

app.use(express.static(clientPath));

app.get(/.*/, (_, res) => {
  res.sendFile(path.join(clientPath, "index.html"));
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is connected at port ${PORT}`);
});
