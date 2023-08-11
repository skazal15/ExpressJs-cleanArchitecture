const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const uniqueValidator = require('mongoose-unique-validator');
let UserSchema = new Schema({
    name:{
        type:String
    },
    email:{
        type : String,
        unique:true
    },
    password:{
        type:String
    }
},{
    collection:'users'
})
UserSchema.index({email:1});
UserSchema.plugin(uniqueValidator,{message:'email already registered'})
module.exports=mongoose.model('User',UserSchema)