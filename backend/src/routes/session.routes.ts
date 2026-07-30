import { Router } from "express";
import getAllSession from "../controllers/session.controller";

const router = Router();

router.get("/", getAllSession);

export default router;