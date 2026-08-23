import express from "express";
import driverRoutes from "./routes/driver.routes";
import sessionRoute from "./routes/session.routes";
import meetingRoute from "./routes/meeting.routes";
import syncRoutes from "./routes/sync.routes";
import dashboardRoutes from "./routes/dashboard.routes";

const app = express();
app.use(express.json());

app.use("/api/drivers", driverRoutes);

app.use("/api/sessions", sessionRoute);

app.use("/api/meetings", meetingRoute);

app.use("/api/sync", syncRoutes);

app.use("/api/dashboard", dashboardRoutes);

export default app;