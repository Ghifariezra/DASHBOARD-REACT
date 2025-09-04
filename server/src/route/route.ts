import { Router } from "express";
import { getAllProvinces, getProvince } from "../controller/school/schoolController";

const router = Router();

// Root route
router.get("/", (req, res) => res.send("Hello World!"));

// School routes
router.get("/provinces", getAllProvinces);
router.get("/provinces/:id", getProvince);

export default router;
