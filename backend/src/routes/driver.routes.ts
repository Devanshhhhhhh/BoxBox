import { Router } from "express"
import getAllDrivers from "../controllers/driver.controller"

const router = Router();

router.get("/", getAllDrivers);

export default router;