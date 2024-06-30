const mongoose=require('mongoose');
const jwt=require('jsonwebtoken');

const userSchema=new mongoose.Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:false
    },
    email:{
        type:String,
        required:true,
        unique:[true,"email is already present"]
    },
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

userSchema.pre("save",async function(next){
    if(this.isModified==="password"){
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
})

userSchema.methods.generateToken=function(){
    const token=jwt.sign({_id:this._id},process.env.SECRET_CODE,{
        expiresIn:'24hr'
    })
    return token;
}

module.exports=mongoose.model("User",userSchema);

