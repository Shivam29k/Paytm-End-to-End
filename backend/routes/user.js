const { JWT_SECRET } = require('../config');
const zod = require('zod');
const jwt = require('jsonwebtoken');
const User = require('../db').user;

const userSchema = zod.object({
    username: zod.string().email().nonempty(),
    password: zod.string().min(6),
    firstname: zod.string().max(30).nonempty(),
    lastname: zod.string().max(30)
})

const router  = express.Router();

router.post('/signup', async (req, res)=>{
    const validated = userSchema.safeParse(req.body);
    
    if(!validated.success){
        res.status(411).json({
            message: "Incorrect inputs"
        })
    }
    
    const existingUser = await User.findOne({
        username: req.body.username
    })
    
    if (!existingUser){
        res.status(411).json({
            message: "User already exists"
        })
    }

    const user = await User.create({
        username: req.body.username,
        password: req.body.password,
        firstname: req.body.firstname,
        lastname: req.body.lastname
    })
    const userID =  user._id;
    
    const token = jwt.sign({userID}, JWT_SECRET);
    
    res.status(200).json({
        message: "User created successfully",
        token : token
    })
    
})

router.post('/signin', async (req, res)=>{
    
    const validated = userSchema.safeParse(req.body);
    
    if(!validated.success){
        res.status(411).json({
            message: "Incorrect inputs"
        })
    }

    const user = User.findOne({
        username: req.body.username
    })
    
    if(!user){
        res.status(411).json({
            message: "User not found"
        })
    }

    if(user.password !== req.body.password){
        res.status(411).json({
            message: "Incorrect password"
        })
    }

    const token = jwt.sign({userID: user._id}, JWT_SECRET);

    res.status(200).json({
        message: "User logged in successfully",
        token : token
    })
})

module.exports = router;