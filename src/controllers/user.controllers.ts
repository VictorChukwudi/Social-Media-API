import { Request, Response } from "express";
import { UserService } from "../services/user.services";

const followOrUnfollowUser= async (req: Request, res: Response) => {
    try {
        const userId: string = req.params.userId
        const followerId: any= req["user"].id
        const existingUser= await UserService.findUserById(userId)
        const follower= await UserService.findUserById(followerId)

        if(userId == followerId){
            res.status(400)
            throw new Error('You cannot follow yourself.')
        }

        if(!existingUser){
           res.status(404)
           throw new Error(`User with id: ${userId} not found`)
        }

        //check if follower has followed user already
        //Unfollow if followed already
        const followers= existingUser.followers
        const followings= follower.following
        if(followers.includes(followerId)){
           const updateFollowers= followers.filter((followerId: any)=> followerId !== followerId)
           const updateFollowings= followings.filter((userId: any)=> userId !== userId)
           
            await UserService.updateUser(userId, {followers: updateFollowers})
            await UserService.updateUser(followerId, {following: updateFollowings})
            
           res.status(200).json({
            status:"success",
            msg:`Unfollowed ${existingUser.firstName} ${existingUser.lastName} successfully.`
           })
        }else{
            //follow if not followed already
            const userfollowers=[...followers, followerId]
            const followerFollowings=[...followings, userId]
            
            await UserService.updateUser(userId,{followers: userfollowers})
            await UserService.updateUser(followerId, {following: followerFollowings})   
            
            res.status(200).json({
                status:"success",
                msg:`Followed ${existingUser.firstName} ${existingUser.lastName} successfully.`
            })
        }
    } catch (error) {
        res.json({
            status:"error",
            msg: error.message
        })
    }
}


export{
    followOrUnfollowUser
}