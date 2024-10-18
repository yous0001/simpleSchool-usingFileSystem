import { readData, writeData } from "../../DB/connection.js"

export const getCourses=async(req,res,next)=>{
    const courses=await readData("courses.json")
    res.json({message:'done',courses})
}


export const addCourses=async(req,res,next)=>{
    const {id,name,content,departmentID}=req.body;

    if(!id||!name||!content||!departmentID){
        return res.status(404).json({
            message:"please complete data"
        })
    }

    let departments=await readData("departments.json")
    let courses=await readData("courses.json")

    const isDepartmentIDExists=departments.find(department=>department.id==departmentID)
    
    if(!isDepartmentIDExists){
        return res.status(404).json({
            message:"department id not found"
        })
    }
    const isCourseIDExists=courses.find(course=>course.id==id)
    
    if(isCourseIDExists){
        return res.status(409).json({
            message:"course id is already exists"
        })
    }



    const newCourse={id,name,content,departmentID}
    courses.push(newCourse)
    await writeData("courses.json",courses)

    res.status(201).json({message:'updated succefully',newCourse})
}
