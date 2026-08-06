import { Router } from "express"
import { syncDrivers, syncMeetings, syncSessions } from "../controllers/sync.controller"
const router = Router();

router.post("/drivers", syncDrivers);

router.post("/meetings", syncMeetings);

router.post("/sessions", syncSessions);

export default router;