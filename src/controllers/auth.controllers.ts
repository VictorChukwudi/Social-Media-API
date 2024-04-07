import { Request, Response } from "express"
import { io } from "../server"
import { UserService } from "../services/user.services"
import { Encrypt } from "../helpers/encrpt"
import { UserDto } from "../dto"

const registerUser= async (req: Request, res: Response) => {
    try {
        const {email}= req.body
        const existingUser= await UserService.findUserByEmail(email)
        if(existingUser){
            res.status(400)
            throw new Error('Email is registered already.')
        }
        const newUser= await UserService.registerUser(req.body)

        const response= new UserDto()
        response.id= newUser._id
        response.email= newUser.email
        response.firstName= newUser.firstName
        response.lastName= newUser.lastName
        response.followers= newUser.followers
        response.following= newUser.following

        const payload={
            id: newUser._id,
            email: newUser.email,
        }
        const token =await Encrypt.generateToken(payload)
        res.status(201).json({
            status:"success",
            data: {
                user: response,
                token
            }
        })
    } catch (error) {
        res.json({
            status:"error",
            msg: error.message
        })
    }
}

const loginUser= async (req: Request, res: Response) => {
    try {
        const {email, password}= req.body
        const existingUser= await UserService.findUserByEmail(email)
        if(!existingUser){
            res.status(400)
            throw new Error('Email is not registered. Signup.')
        }
        const user= await UserService.loginUser(email, password)
        if(!user){
            res.status(400)
            throw new Error('Invalid credentials.')
        }

        const payload={
            id: user._id,
            email: user.email,
        }

        const token= await Encrypt.generateToken(payload)

        const response= new UserDto()
        response.id= user._id
        response.email=user.email
        response.firstName=user.firstName
        response.lastName=user.lastName
        response.followers=user.followers
        response.following=user.following

        
        io.socketsJoin(response.id)

        res.status(200).json({
            status:"success",
            data: {
                user:response,
                token
            }
        })
    } catch (error) {
        res.json({
            status:"error",
            msg: error.message
        })
    }
}

export {
    registerUser,
    loginUser
}