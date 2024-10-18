import { Router } from "express";
import * as departmentsController from "./departments.controller.js"

const router =Router()

router.get("/",departmentsController.getDepartments)
router.get("/:id",departmentsController.getSpecificDepartment)
router.post("/add",departmentsController.addDepartment)

export default router