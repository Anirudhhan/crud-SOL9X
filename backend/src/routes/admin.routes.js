import express from "express";
import {
  getAllStudents,
  addStudent,
  editStudent,
  deleteStudent,
} from "../controllers/admin.controller.js";
import { protect, adminOnly } from "../middleware/auth.js";

const router = express.Router();

router.use(protect, adminOnly); 

router.get("/students", getAllStudents);
router.post("/students", addStudent);
router.put("/students/:id", editStudent);
router.delete("/students/:id", deleteStudent);

export default router;
