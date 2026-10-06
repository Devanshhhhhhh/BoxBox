import { Router } from "express";
import { getLocationChunkController } from "../controllers/replay.controller";

const router = Router();

router.get("/location/:sessionKey", getLocationChunkController);

export default router;