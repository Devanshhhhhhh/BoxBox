import { Router } from "express"
import getAllMeetings from "../controllers/meeting.controller";
const router = Router();

router.get("/", getAllMeetings);

export default router;