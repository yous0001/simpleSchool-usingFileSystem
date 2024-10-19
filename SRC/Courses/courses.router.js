import { Router } from "express";
import * as coursesController from "./courses.controller.js"

const router =Router()

router.get("/",coursesController.getCourses)
router.post("/add",coursesController.addCourses)
router.get("/:id",coursesController.getSpecificCourse)
router.put("/:id",coursesController.updateCourse)
router.delete("/:id",coursesController.deleteCourse)

export default router