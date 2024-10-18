import { Router } from "express";
import * as departmentsController from "./departments.controller.js"

const router =Router()

router.get("/",departmentsController.getDepartments)
router.get("/:id",departmentsController.getSpecificDepartment)
router.delete("/:id",departmentsController.deleteDepartment)
router.post("/add",departmentsController.addDepartment)
router.patch("/:id",departmentsController.updateDepartment)

export default router