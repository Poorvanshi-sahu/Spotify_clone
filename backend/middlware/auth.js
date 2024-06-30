const jwt = require("jsonwebtoken");

const authenticate = async(req, res, next)=>{
    try {
        let token = req.header('Authorization');

        if(token.startsWith('Bearer')){
            token = token.split(' ')[1];
        }
        
        const loginUser = await jwt.verify(token, process.env.SECRET_CODE);
    
        console.log(loginUser._id, req.user);
        
        req.user = loginUser;
    
        next();
    } catch (error) {
        res.status(400).json({"message":"Unauthenticate"})
    }
    
}

module.exports = authenticate;