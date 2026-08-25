import { Router } from "express";
import getRaceByMeetingKey from "../controllers/race.controller";

const router = Router();

router.get("/:meetingKey", getRaceByMeetingKey);

export default router;