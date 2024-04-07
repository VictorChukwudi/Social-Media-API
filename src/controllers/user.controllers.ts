import { Request, Response, response } from "express";
import { UserService } from "../services/user.services";
import { io } from "../server";
import { NotificationService } from "../services/notification.service";
import { NotificationDto, UserDto } from "../dto";

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
            
            //create notification and send notification using socket.io
            const recipientId= userId
            const message=`${follower.firstName} ${follower.lastName} followed you.`
            const notification= await NotificationService.createNotification(userId,message)
            const emittedNotification= {
                recipient: notification.recipient,
                message: notification.message
            }
            io.to(recipientId).emit("notification", emittedNotification)

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

const getFollowers= async (req: Request, res: Response) => {
    try {
        const myFollowers: any[]=[]
        const userId=req["user"].id
        const existingUser= await UserService.findUserById(userId)
        const followers= existingUser.followers

        if(followers.length < 1){
            res.status(200).json({
                status:"success",
                data:{
                    followers: myFollowers,
                    noOfFollowers: myFollowers.length
                }
            })
        }else{
            for (let i = 0; i < followers.length; i++) {
                const id= followers[i]
                const searchFollower= await UserService.findUserById(id)
                const followerDto= new UserDto()
                followerDto.id= searchFollower._id
                followerDto.email= searchFollower.email
                followerDto.firstName= searchFollower.firstName
                followerDto.lastName= searchFollower.lastName
                
                myFollowers.push(followerDto)
            }
              res.status(200).json({
                  status:"success",
                  data: {
                    followers: myFollowers,
                    noOfFollowers: myFollowers.length
                  }
              })
        }
      
        
    } catch (error) {
        res.status(500).json({
            status:"error",
            msg:error.message
        })        
    }
}

const getFollowings= async (req: Request, res: Response) => {
    try {
        let myFollowings: any[]=[]
        const userId=req["user"].id
        const existingUser= await UserService.findUserById(userId)
        const followings= existingUser.following

        if(followings.length < 1){
            res.status(200).json({
                status:"success",
                data:{
                    followers: myFollowings,
                    noOfFollowings: myFollowings.length
                }
            })
        }else{
            for (let i = 0; i < followings.length; i++) {
                const id= followings[i]
                const searchFollowing= await UserService.findUserById(id)
                const followingDto= new UserDto()
                followingDto.id= searchFollowing._id
                followingDto.email= searchFollowing.email
                followingDto.firstName= searchFollowing.firstName
                followingDto.lastName= searchFollowing.lastName
                
                myFollowings.push(followingDto)
            }
              res.status(200).json({
                  status:"success",
                  data: {
                    followers: myFollowings,
                    noOfFollowings: myFollowings.length
                  }
              })
        }

    } catch (error) {
        res.status(500).json({
            status:"error",
            msg:error.message
        })        
    }
}

const getNotifications= async (req: Request, res: Response) => {
    try {
        const userId: any= req["user"].id
        const notifications = await NotificationService.getUserNotifications(userId)
        let response: any[]=[]
        notifications.forEach(( notification) => {
            const notify= new NotificationDto()
          notify.message= notification.message
          notify.postId= notification.postId
          response.push(notify)
        });
        res.status(200).json({
            status:"success",
            data: response
        })
    } catch (error) {
        res.status(500).json({
            status:"error",
            msg: error.message
        })
    }
}
export{
    followOrUnfollowUser,
    getFollowers,
    getFollowings,
    getNotifications
}