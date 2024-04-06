import express from "express"
import dotenv from "dotenv"
import connectDB from "./config/db"
import router from "./routes"
dotenv.config()


connectDB()
const app= express()
const port= process.env.PORT || 3500

app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use("/api", router)



app.listen(port,()=>{
    console.log(`Server running at port ${port}...`);
    
})