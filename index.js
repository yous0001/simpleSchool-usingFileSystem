import chalk from "chalk"
import express from "express"
import studentsRouter from "./SRC/Students/students.router.js"
import departmentsRouter from "./SRC/Departments/departments.router.js"
import coursesRouter from "./SRC/Courses/courses.router.js"

const app=express()
const port =3000

app.use(express.json())

app.use("/students",studentsRouter)
app.use("/courses",coursesRouter)
app.use("/departments",departmentsRouter)



app.listen(port,()=>{
    console.log(chalk.bgBlue(`app is running on port ${port}`));
})