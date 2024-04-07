import express from "express"
import {createServer} from "http"
import { Server } from "socket.io"
import dotenv from "dotenv"
import connectDB from "./config/db"
import router from "./routes"
dotenv.config()


connectDB()
const app= express()
const httpServer = createServer(app);
export const io = new Server(httpServer, { /* options */ });

const port= process.env.PORT || 3500

app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use("/api", router)


// io.on("connection", (socket) => {
//     // ...
//   });


httpServer.listen(port, ()=>{
    console.log(`Server running at port ${port}...`);
});