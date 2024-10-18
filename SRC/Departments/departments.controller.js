import { readData, writeData } from "../../DB/connection.js"


export const getDepartments=async(req,res,next)=>{
    const departments=await readData("departments.json")
    res.json({message:'done',departments})
}

export const deleteDepartment=async(req,res,next)=>{
    const {id}=req.params
    const departments=await readData("departments.json")
    const departmentIndex=departments.findIndex(item=>item.id==id)

    if(departmentIndex==-1){
        return res.status(404).json({
            message:"department not Found"
        })
    }

    departments.splice(departmentIndex,1)

    await writeData("departments.json",departments)

    res.status(200).json({message:'deleted succuessfully'})
}

export const getSpecificDepartment=async(req,res,next)=>{
    const {id}=req.params
    const departments=await readData("departments.json")
    const department=departments.find(item=>item.id==id)

    if(!department){
        return res.status(404).json({
            message:"department not Found"
        })
    }
    res.status(200).json({message:'done',department})
}

export const addDepartment=async(req,res,next)=>{
    const {id,name}=req.body;

    if(!id||!name){
        return res.status(404).json({
            message:"please complete data"
        })
    }

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

    res.status(201).json({message:'updated succefully',newDepartment})
}


export const updateDepartment=async(req,res,next)=>{
    const {id}=req.params
    const {name}=req.body
    const departments=await readData("departments.json")
    const departmentIndex=departments.findIndex(item=>item.id==id)

    if(departmentIndex==-1){
        return res.status(404).json({
            message:"department not Found"
        })
    }

    const newDepartment={id,name}

    departments.splice(departmentIndex,1,newDepartment)

    await writeData("departments.json",departments)

    res.status(200).json({message:'updated succuessfully',newDepartment})
}
