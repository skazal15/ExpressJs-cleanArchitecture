const swaggerJSDoc = require('swagger-jsdoc')

const options = {
    swaggerDefinition:{
        info:{
            title:"express js clean",
            version:"1.0.0",
            description:"api doc for express js clean architecture"
        },
        basePath:'/api/',
    },
    apis:['./routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;