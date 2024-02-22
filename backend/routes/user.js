const express = require("express");
const zod = require('zod');
const jwt = require('jsonwebtoken');
const { JWT_SECRET }  = require("../config");
const { User, Account } = require('../db'); 
const { authMiddleware }  = require("../middleware/middleware");

const signUpBody = zod.object({
    username: zod.string().email().nonempty(),
    password: zod.string().min(6),
    firstname: zod.string().max(30).nonempty(),
    lastname: zod.string().max(30)
})
const router  = express.Router();

router.post('/signup', async (req, res)=>{

    // body : {
    //     username: "name@gmail.com",
    //     firstName: "name",
    //     lastName: "name",
    //     password: "123456"
    // }

    const validInputs = signUpBody.safeParse(req.body)
    
    if(!validInputs.success){
        return res.status(411).json({
            message: "Incorrect inputs"
        })
    }
    
    const existingUser = await User.findOne({
        username: req.body.username
    })
    
    if (existingUser){
        return res.status(411).json({
            message: "User already exists"
        })
    }

    const user = await User.create({
        username: req.body.username,
        password: req.body.password,
        firstname: req.body.firstname,
        lastname: req.body.lastname
    }).catch((e)=>{
        console.log("Error creating user. \n", e)
    })

    const userID =  user._id;
    console.log(userID);
    
    await Account.create({
        userID : userID,
        balance : 1 + parseInt(Math.random()*10000) //this code will generate random balace btwn 1 to 10,000.
    }).catch((e)=>{
        console.log("Error creating account. \n", e)
    })

    const token = jwt.sign({userID}, JWT_SECRET);
    
    return res.status(200).json({
        message: "User created successfully",
        token : token
    })
    
})



const signIpBody = zod.object({
    username: zod.string().email().nonempty(),
    password: zod.string().min(6)
})

router.post('/signin', async (req, res)=>{

    // body: {
    //     username: "name@gmail.com",
    //     password: "123456"
    // }

    const validInputs = signIpBody.safeParse(req.body);

    if(!validInputs.success){
        return res.status(411).json({
            message: "Incorrect inputs"
        })
    }

    const user = await User.findOne({
        username: req.body.username
    }).catch((e)=>{
        console.log(e);
    })
    
    if(!user){
        return res.status(411).json({
            message: "User not found"
        })
    }
    console.log(user);

    if(user.password !== req.body.password){
        return res.status(411).json({
            message: "Incorrect password"
        })
    }

    const token = jwt.sign({userID: user._id}, JWT_SECRET);

    res.status(200).json({
        message: "User logged in successfully",
        token : token
    })
})



const updateBody = zod.object({
    password: zod.string().min(6).optional(),
    firstname: zod.string().max(30).optional(),
    lastname: zod.string().max(30).optional()
})

router.put('/', authMiddleware, async (req, res)=>{
    const validinputs = updateBody.safeParse(req.body);

    if(!validinputs.success){
        return res.status(411).json({
            message: "Incorrect inputs"
        })
    }

    await User.updateOne({_id: req.userID}, req.body);

    return res.status(200).json({
        message: "Updated successfully"
    })

})


// test you code from here ---------------------------------------------------------------------------

router.get('bulk', async (req, res)=>{
    const firstname = req.query.filter.split(" ")[0] || " ";
    const lastname = req.query.filter.split(" ")[1] || " ";

    const users = await User.find({
            f$or: [{
                firstName: {
                    "$regex": filter
                }
            }, {
                lastName: {
                    "$regex": filter
                }
            }]
        })


    res.status(200).json({
        users: users.map(user => ({
            username: user.username,
            firstname: user.firstname,
            lastname: user.lastname,
            _id: user._id
        }))
    })
})

module.exports = router;