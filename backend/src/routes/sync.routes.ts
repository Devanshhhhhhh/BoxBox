import { Router } from "express"
import { syncDrivers, syncMeetings, syncSessions, syncResults} from "../controllers/sync.controller"

const router = Router();

router.post("/drivers", syncDrivers);

router.post("/meetings", syncMeetings);

router.post("/sessions", syncSessions);

router.post("/results", syncResults);

export default router;