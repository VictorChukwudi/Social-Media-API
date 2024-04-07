import { Encrypt } from "../helpers/encrpt";
import User from "../models/user.model";

export class UserService{
    static async registerUser({firstName, lastName, email, password}){
        const newUser= new User({
            firstName,
            lastName,
            email,
            password: await Encrypt.encryptPassword(password)
        }).save()

        return newUser
    }

    static async loginUser(email :string, password : string){
        const user= await User.findOne({email})
        const isAuth=await Encrypt.comparePassword(password, user.password)
        if(!isAuth){
            return
        }
        return user
    }

    static async findUserById(id: any){
        const user= await User.findById(id)
        return user
    }

    static async findUserByEmail(email: string){
        const user= await User.findOne({email})
        return user
    }

    static async updateUser(id: string, update: object){
        const user= await User.findByIdAndUpdate(id, update, {new: true})
        return user
    }
}