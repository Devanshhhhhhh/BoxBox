import { Router } from "express"
import { syncDrivers, syncMeetings, syncSessions, syncResults, syncLaps} from "../controllers/sync.controller"

const router = Router();

router.post("/drivers", syncDrivers);

router.post("/meetings", syncMeetings);

router.post("/sessions", syncSessions);

router.post("/results", syncResults);

router.post("/laps", syncLaps);

export default router;