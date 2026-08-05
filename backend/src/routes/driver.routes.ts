import { Router } from "express"
import { getAllDrivers, createDriver } from "../controllers/driver.controller"

const router = Router();

router.get("/", getAllDrivers);
router.post("/", createDriver);

export default router;