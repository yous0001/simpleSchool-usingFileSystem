import chalk from "chalk"
import express from "express"

const app=express()
const port =3000

app.use(express.json())

app.listen(port,()=>{
    console.log(chalk.bgBlue(`app is running on port ${port}`));
})