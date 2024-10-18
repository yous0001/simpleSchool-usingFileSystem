import { readData, writeData } from "../../DB/connection.js"


export const getDepartments=async(req,res,next)=>{
    const departments=await readData("departments.json")
    res.json({message:'done',departments})
}

export const getSpecificDepartment=async(req,res,next)=>{
    const {id}=req.params
    const departments=await readData("departments.json")
    const department=departments.find(item=>item.id==id)
    res.json({message:'done',department})
}

export const addDepartment=async(req,res,next)=>{
    const {id,name}=req.body;

    let departments=await readData("departments.json")

    const isDepartmentIDExists=departments.find(department=>department.id==id)
    console.log(isDepartmentIDExists);
    
    if(isDepartmentIDExists){
        return res.status(409).json({
            message:"department id is aleardy exists"
        })
    }
    const newDepartment={id,name}
    departments.push(newDepartment)
    await writeData("departments.json",departments)

    res.json({message:'done',newDepartment})
}