const jwt = require('jsonwebtoken');
module.exports = (req,res,next)=>{
    try{
        const token = req.headers.authorization.split(" ")[1];
        const decodeToken = jwt.verify(token,"longer-secret-is-better");
        req.userData = {userId: decodeToken.userId};
        next();
    }catch(error){
        console.log(error)
        res.status(401).json({message:"No token provided"})
    }
};
