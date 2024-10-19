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


export const getSpecificCourse=async(req,res,next)=>{
    const {id}=req.params
    const courses=await readData("courses.json")
    const course=courses.find(course=>course.id==id)

    if(!course){
        return res.status(404).json({
            message:"course not Found"
        })
    }
    res.status(200).json({message:'done',course})
}

export const updateCourse=async(req,res,next)=>{
    const {id}=req.params
    const {name,content}=req.body;

    if(!(name||content)|| !id){
        return res.status(400).json({
            message:"please provide name or content with id"
        })
    }

    const courses=await readData("courses.json")
    const courseIndex=courses.findIndex(course=>course.id==id)
    const course =courses[courseIndex]
    
    if(courseIndex==-1){
        return res.status(404).json({
            message:"course not Found"
        })
    }

    
    if(name)
        course.name=name;
    if(content)
        course.content=content;

    courses.splice(courseIndex, 1,course);

    await writeData("courses.json",courses)
    res.status(200).json({message:'update done',course})
}

export const deleteCourse=async(req,res,next)=>{
    const {id}=req.params

    if(!id){
        return res.status(400).json({
            message:"you must provide id of course"
        })
    }

    const courses=await readData("courses.json")

    const courseIndex=courses.findIndex(course=>course.id==id)
    
    if(courseIndex==-1){
        return res.status(404).json({
            message:"course not Found"
        })
    }


    courses.splice(courseIndex, 1);

    await writeData("courses.json",courses)
    res.status(200).json({message:'deleted successfully'})
}
