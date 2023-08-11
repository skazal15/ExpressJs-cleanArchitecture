const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userRepository = require("../infrastructure/repository/userRepository");

class UserService{
    async registerUser(userData){
        const hashedPass = await bcrypt.hash(userData.password, 10);
        userData.password = hashedPass;
        return userRepository.createUser(userData);
    };

    async authUser(email,password){
        const user = await userRepository.getUserByEmail(email);
        if(!user)return null;

        const isValid = await bcrypt.compare(password,user.password);
        if(!isValid)return null;

        const token = jwt.sign({userId:user.id},"longer-secret-is-better",{
            expiresIn:"1h",
        });

        return {user,token};
    };

    async getUserById(id){
        return userRepository.getUserById(id);
    }

    async getUserByEmail(email){
        return userRepository.getUserByEmail(email);
    }
}

module.exports = new UserService();