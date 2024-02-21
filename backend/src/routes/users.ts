import express, { Request, Response } from 'express'
import User from '../models/user'
import jwt from 'jsonwebtoken'
import { check, validationResult } from 'express-validator'
const router=express.Router()
router.post("/register", [
    check('email','Email is Required').isEmail(),
    check('password','Password is Required').isLength({min:6}),
    check('fName','First Name is Required').isString(),
    check('lName','Last Name is Required').isString()
    ],async (req: Request, res: Response) => {

        const errors=validationResult(req)
        if(!errors.isEmpty()){
        return res.status(400).json({message: errors.array()})
        }

        try {
            let user= await User.findOne({email: req.body.email})
            if(user) return res.status(400).json({message: 'User already exist'})
            user= new User(req.body)
            user.save()
            const token = jwt.sign(
                {userId: user.id},
                process.env.JWT_SECRET_KEY as string,
                { expiresIn: '1d'}
            )
            // aut token
            res.cookie('jwt_token',token,{
                httpOnly:true,
                // secure: process.env.ENVIRONMENT === 'production',
                secure: true,
                sameSite: 'none',
                maxAge:86400000,
            })
            return res.status(200).send({message:'User Registered'})
        } catch (error) {
            console.log('er',error);
            
            res.status(500).send({message: 'Something went wrong'})
        }
    })

export default router

