import { Router } from "express"
import { syncDrivers, syncMeetings } from "../controllers/sync.controller"
const router = Router();

router.post("/drivers", syncDrivers);

router.post("/meetings", syncMeetings)

export default router;