import express from "express"
import { connectDB } from "./config/db.js";
import userRouter from "./routes/userRoutes.js";

const app=express();
const port=4000;
app.use(express.json());
connectDB();

app.use("/",userRouter)
app.get("/",(req,res)=>{
    console.log("Api is Working");
});

app.listen(port,(req,res)=>{
    console.log(`Server is running on port ${port}`)
});
