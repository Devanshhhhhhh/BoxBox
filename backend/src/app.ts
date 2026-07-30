import express from "express";
import healthRoutes from "./routes/health.routes";
import greetUser from "./routes/greet.routes";
import driverRoutes from "./routes/driver.routes";
import sessionRoute from "./routes/session.routes";

const app = express();
app.use(express.json());

app.use("/api/health", healthRoutes);

app.use("/api/greet", greetUser);

app.use("/api/drivers", driverRoutes);

app.use("/api/session", sessionRoute)

export default app;