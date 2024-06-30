require("dotenv").config();
const express=require("express");
const connectDB = require("./db/connect");
const app=express();
const jwt=require('jsonwebtoken')
const bcrypt=require('bcrypt');
const bodyParser = require('body-parser');
const authRoutes=require("./routes/auth");
const songRoutes = require("./routes/song");
const playListRoutes = require("./routes/playlist");

// app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/',(req,res)=>{
    res.send("Hello World");
})

// Set up of routes
app.use('/auth', authRoutes);
app.use('/song', songRoutes);
app.use("/playList",playListRoutes);

app.post('/login',async(req,res)=>{
    const {email,password}=req.body;

    if(!email || !password){
        res.status(400).json({
          message:"email and password is required"
        })
    }

    const user=await User.findOne({email});

    console.log("user",user);
    // console.log(user);

    if(!user){
        res.status(404).json({
          message:"User not found"
        })
    }

    const isMatch=await bcrypt.compare(password,user.password);

    if(!isMatch){
        res.status(400).json({message:"Password not matched"})
    }

    const token=jwt.sign({_id:user._id},process.env.SECRET_CODE);

    res.status(200).cookie("token",token).json({
      message:"Login successful",
      user
    })
})

const start=async()=>{
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(3000,()=>console.log(`Listening on port 3000`));
    } catch (error) {
        console.log("Error while connecting to mongo", error.message);
    }
}

start();