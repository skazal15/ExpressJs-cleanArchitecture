const UserService = require("../usecase/user");
const {validationResult} = require("express-validator");

class UserController{
    async register(req,res,next){
            
        const err = validationResult(req);
        if(err.isEmpty){

        try{
            const user = await UserService.registerUser(req.body);
            return res.status(201).json({message:"user create",user});
        }
        catch(err){
            next(err);
        }
    }else{
        return res.status(422).jsonp(errors.array());
    }
    }

    async login(req,res,next){
        try{
            const {email,password} = req.body;

            const {user,token} = await UserService.authUser(email,password);

            if(!user){
                return res.status(400).json({message:"user not found"})
            }

            return res.json({token,expiresIn:3600,user:user});
            
        }
        catch(err){
            next(err);
        }
    }

    async getUserProfile(req,res,next){
        try{
            const user = await UserService.getUserByEmail(req.params.email);
            
            if(!user){
                return res.status(404).json({message:"user not found"});
            };

            return res.json(user);
        }
        catch (err){
            next(err)
        }
    }
}

module.exports = new UserController();