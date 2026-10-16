import { Router } from "express";
import { getLapsController, getLocationChunkController, getPitController, getPositionController } from "../controllers/replay.controller";

const router = Router();

router.get("/location/:sessionKey", getLocationChunkController);
router.get("/position/:sessionKey", getPositionController);
router.get("/laps/:sessionKey", getLapsController);
router.get("/pit/:sessionKey", getPitController);

export default router;