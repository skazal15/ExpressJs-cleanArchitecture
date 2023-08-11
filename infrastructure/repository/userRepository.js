const User = require("../models/User");

class UserRepository{
    async createUser(userData){
        return User.create(userData);
    }

    async getUserByEmail(email){
        return User.findOne({email});
    }

    async getUserById(id){
        return User.findOne(id);
    }
}

module.exports = new UserRepository();