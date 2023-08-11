const mongoose = require("mongoose")

async function mongoDbConnection(){
    await mongoose.connect("mongodb://127.0.0.1:27017/express",
    {
        useNewUrlParser:true,
        useUnifiedTopology:true,
    });
}

module.exports = mongoDbConnection;