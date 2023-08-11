const express = require('express');
const {check} = require("express-validator");
const router = express.Router();
const userController = require("../controller/userController");
const cors = require('cors')
const auth = require("../middlewares/auth")

var whitelist = ["http://localhost:4200", "http://localhost:4000"]
var corsOptionDelegate = function(req,callback){
    if(whitelist.indexOf(req.header("Origin")) !== -1){
        corsOptions = {
            origin:"*",
            methods:"GET,HEAD,PUT,PATCH,POST,DELETE",
        };
    }else{
        corsOptions = {origin:false};
    }
    callback(null,corsOptions);
};

/**
* @swagger
* /register-user:
*   post:
*     tags:
*       - User API
*     summary: Register User
*     consumes: application/json
*     parameters:
*       - in: body
*         name: data
*         schema:
*           type: object
*           properties:
*             name:
*                 type: string
*             email:
*                 type: string
*             password:
*                 type: string
*     responses:
*       201:
*         description: Created
*       422:
*         description: Bad Request
*       500:
*         description: Internal Server Error
*/ 

router.post(
    "/register-user",[
        check("name").not().isEmpty().isLength({min:3}).withMessage("name must be length 3 char"),
        check("email","Email is required").not().isEmpty(),
        check("password","Password should be between 5 to 8").not().isEmpty().isLength({min:5,max:8}),
    ], userController.register);

/**
* @swagger
* /signin:
*   post:
*     tags:
*       - User API
*     summary: Signin User
*     consumes: application/json
*     parameters:
*       - in: body
*         name: data
*         schema:
*           type: object
*           properties:
*             email:
*                 type: string
*             password:
*                 type: string
*     responses:
*       201:
*         description: Created
*       422:
*         description: Bad Request
*       500:
*         description: Internal Server Error
*/ 
router.post('/signin',userController.login);

/** 
 * @swagger
 * /profile/{email}:
 *  get:
 *   tags:
 *    - User API
 *   summary: Get Profile User
 *   components:
 *    securitySchemes:
 *      BearerAuth:
 *        type: http
 *        scheme: bearer
 *        bearerFormat: JWT
 *   security:
 *    - BearerAuth: []
 *   parameters:
 *    - in: path
 *      name: email
 *      required: true
 *      description: email user
 *      schema:
 *        type: string
 *   responses:
 *       201:
 *         description: Created
 *       422:
 *         description: Bad Request
 *       500:
 *         description: Internal Server Error
*/
router.get('/profile/:email',auth,userController.getUserProfile);
module.exports = router;