const express=require("express");
const cors= require("cors");
const { connection } = require("./configs/connection");

const { UserModel }=require("./model/user.model")
const { QuizModel }=require("./model/quiz.model")

require("dotenv").config();

const app=express();

app.use(cors())
app.use(express.json());


app.get("/",(req,res)=>{
    res.json("Backend Server is running 🤘")
})

app.post("/register",async(req,res)=>{
    const {email,username}=req.body;
    if(!email || !username){
        return res.status(400).json({message: "Missing Credentials"})
    }
    try {
        const user= await UserModel.findOne({ email });
        if(user){
            return res.status(200).json({message: "Welcome Back !"})
        }
        const newUser= new UserModel({email,username});
        newUser.save()
        return res.status(201).json({ message: "User Registration Successfull !" })
    } catch (error) {
        console.log(error)
    }

})

app.post("/newQuiz",async(req,res)=>{
    // console.log(req.body)
    try {
        const newQuiz = new QuizModel(req.body);
        newQuiz.save()
        return res.status(201).json({ message: "New Quiz Created" })

    } catch (error) {
        console.log(error)
    }
})
app.get("/allQuiz",async(req,res)=>{
    const allQuiz= await QuizModel.find()
    return res.status(200).json(allQuiz)
})

app.listen(process.env.PORT,async()=>{
    try {
        await connection
        .then(()=>{
            console.log("Connected to MongoDB Atlas")
        })
        .then(()=>{
            console.log(`Server is Running at PORT ${process.env.PORT}`)
        })
        .catch((err)=>{
            console.log(err)
        })
    } catch (error) {
        console.log(error)
    }
})