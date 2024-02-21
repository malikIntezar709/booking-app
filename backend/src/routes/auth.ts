import  express, { Request, Response }  from "express"
import { check, validationResult } from "express-validator"
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from "../models/user"
import verifyToken from "../middleware/auth"
const router=express.Router()
router.post('/login',[
    check('email','Email is Required').isEmail(),
    check('password','Password is more than 6 characters').isLength({min: 6})
    ], async (req: Request, res: Response) => {
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({message: errors.array()})
    }

    try {
        const {email, password}=req.body;
        const user= await User.findOne({email})
        !user && res.status(401).json({message:'Invalid credentials'})
        const isMatch= bcrypt.compare(password, user?.password as string)
        !isMatch && res.status(401).json({message: 'Invalid credentials'})
        const token= jwt.sign(
            {userId:user?._id},
            process.env.JWT_SECRET_KEY as string,
            { expiresIn: '1d'}
        );
        
        // aut token
        res.cookie('jwt_token',token,{
            httpOnly:true,
            // secure: process.env.ENVIRONMENT === 'production',
            secure: true,
            sameSite: 'none',
            maxAge:86400000,
        })
        res.status(200).json({userId: user?._id})
    } catch (error) {
        console.log(error);
        res.status(500).json({message:'Something went wrong'})
        
    }
})

router.get('/validate-token', verifyToken , (req: Request, res: Response)=>{
    res.status(200).send({userId: req.userId})
})

router.post('/logout', (req: Request, res: Response)=>{
    res.cookie('jwt_token',"",{
        expires: new Date(0),
        secure: true,
            sameSite: 'none',
    })

    res.send()
})

export default router