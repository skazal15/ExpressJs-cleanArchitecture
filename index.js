const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const mongoDbConnection = require("./infrastructure/db/connection")

const api = require('./routes/auth.routes');

const swagger = require('swagger-ui-express');
const swaggerSpec = require('./documentation/swagger');


mongoDbConnection().then(()=>{
    console.log("mongodb connection success");
}),(err)=>{console.log(err);};

const app = express();
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended:false,
    })
);
app.use(cors());
app.use("/public",express.static("public"));
app.use("/api",api);
app.use("/api-docs",swagger.serve,swagger.setup(swaggerSpec))

const port = process.env.PORT || 4000;

const server = app.listen(port,()=>{
    console.log("connected to port",port);
});

app.use((req,res,next)=>{
    setImmediate(()=>{
        next(new Error("something"))
    });
});
app.use((err,req,res,next)=>{
    console.error(err.message);
    if (!err.statusCode) err.statusCode = 500;
    res.status(err.statusCode).send(err.message);
});