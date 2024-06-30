const express=require("express")
const router=express.Router();
const User=require("../models/User")
const bcrypt = require("bcrypt")

// This POST route will register user
router.post('/register',async(req,res)=>{

    // Data expected from body or request Object
    const {username, password, firstName, lastName, email} = req.body;

    const user = await User.findOne({email});
    
    if(user){
        return res.status(403).json({error:"User already exists"});
    }

    try {  

    const hashedPassword = await bcrypt.hash(password,10);     
    const newUser = await User.create({username, password:hashedPassword, firstName, lastName, email});
    // newUser.save();

    await delete newUser.password;
   
    const token = newUser.generateToken()

    const dataToReturn = {...newUser.toJSON(),token};

    delete dataToReturn.password;

    res.status(200).cookie("token",token).json({message:"Successfully registered", user:dataToReturn})
  } catch (error) {
    res.json({message:error.message})
  }
})


router.post("/login",async(req,res)=>{
    // 1.get the data from body
    const {email,password} = req.body;

    // 2. Check if user exists
    const user = await User.findOne({email});

    // 3. If user not exists then return with message
    if(!user){
        return res.status(404).json({"message":"User not present, Please register first"})
    }

     // 4. Compare passwords
    const isMatch = await bcrypt.compare(password,user.password);

    // 5. If password match then generate token and return with message
    if(isMatch){
        const token = await user.generateToken();
        return res.status(200).json({"message":"successfully login", user, token})
    }

    // 6. If password not match then return with message
    return res.status(203).json({"message":"Password not match"})
})

module.exports = router;