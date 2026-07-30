import greetUser from "../controllers/greet.controller";
import { Router } from "express"

const router = Router();

router.get("/:name", greetUser)

export default router;