import { readData, writeData } from "../../DB/connection.js";

export const getStudents=async(req,res,next) => {
    const students = await readData('students.json');
    res.json({ message: 'done', students });
}

export const getStudentById=async(req,res,next) => {
    const { id } = req.params;
    const students = await readData('students.json');
    const student = students.find(student => student.id == id);

    if(!student){
        return res.status(404).json({ message: 'Student not found' });
    }

    const departments=await readData("departments.json")
    const department=departments.find(item=>item.id==student.departmentID)

    if(!department){
        return res.status(404).json({
            message:"department of student not Found please go to Student Affairs to solve the issue"
        })
    }
    student.department=department

    const courses=await readData("courses.json")
    const course=courses.find(item=>item.departmentID==student.departmentID)

    student.course=course


    res.json({ message: 'done', student });
}

export const addStudent=async(req,res,next) => {
    const{ id,name,email,password,departmentID } = req.body;

    if(!id ||!name ||!email ||!password ||!departmentID){
        return res.status(400).json({ message: 'Please complete data' });
    }

    let departments = await readData('departments.json');
    const isDepartmentIDExists = departments.find(department => department.id == departmentID);
    if(!isDepartmentIDExists){
        return res.status(404).json({ message: 'Department not found' });
    }

    let students = await readData('students.json');
    const isEmailExists = students.find(student => student.email === email);
    if(isEmailExists){
        return res.status(409).json({ message: 'Email already exists' });
    }

    const isIDExists = students.find(student => student.id === id);
    if(isIDExists){
        return res.status(409).json({ message: 'ID already exists' });
    }

    const newStudent = { id, name, email, password, departmentID };
    students.push(newStudent);
    await writeData('students.json', students);

    res.status(201).json({ message: 'Student added successfully', newStudent });
}