import express from "express";
import { getProfile, updateProfile } from "../controllers/student.controller.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.use(protect); 

router.get("/profile", getProfile);
router.put("/profile", updateProfile);

export default router;
