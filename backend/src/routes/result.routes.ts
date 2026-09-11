import { Router } from "express"
import getResultsBySession from "../controllers/result.controller";

const router = Router();

router.get("/:sessionKey", getResultsBySession);

export default router;