import { Router } from "express";
import * as studentsController from "./students.controller.js"

const router =Router()

router.get("/", studentsController.getStudents)
router.get("/:id", studentsController.getStudentById)
router.post("/add", studentsController.addStudent)
router.put("/:id", studentsController.updateStudent)
router.delete("/:id", studentsController.deleteStudent)

export default router