import express from "express";
import  mongoose  from "mongoose";
import dotenv from "dotenv";
import PinRouter from "./Routes/Pins.js";
import UserRouter from "./Routes/Users.js";


const app  = express();
dotenv.config();


mongoose.connect(process.env.MONGO_URL,()=>{
    console.log("DB is connect ")
})

app.use(express.json())

app.use("/api/users",UserRouter)
app.use("/api/pins" ,PinRouter)


app.listen(8800,()=>{
    console.log("BackEnd server is running !")
})