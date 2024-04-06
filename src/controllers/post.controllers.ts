import {Request, Response} from "express"
import mongoose from "mongoose"
import { UserService } from "../services/user.services"
import { PostService } from "../services/post.services"
import { PostDto } from "../dto"
import { fileUpload} from "../helpers/file.handler"

const createPost= async (req: Request, res:Response) => {
    try {
        const{body}= req.body
        const id: any= req["user"].id
        const existingUser= await UserService.findUserById(id)
        const creatorId= existingUser._id
        const creator=`${existingUser.firstName} ${existingUser.lastName}`
        

        let imageData: {imageId: string, imageUrl: string}[] = [];
        let videoData: {videoId: string, videoUrl: string}[] = [];
        //Create post without image/video attachments
        if(Object.keys(req.files).length === 0){
            console.log(creatorId);
            console.log(creator);
            
            const details={
                creatorId,
                creator,
                body,
            }

            const newPost= await PostService.createPost(details)
            // console.log(details);
            
            const response= new PostDto()
            response.id= newPost._id
            response.creatorId= newPost.creatorId
            response.creator= newPost.creator
            response.body= newPost.body
            response.imageData= newPost.imageData
            response.videoData= newPost.videoData
            response.likes= newPost.likes.length
            response.comments= newPost.comments

            res.status(201).json({
                status:"success",
                data:response
            })
        }else {
            //Upload images to cloudinary
            const images= req.files["image"]
            if(images){
                for (const image of images) {
                    console.log(image.mimetype);
                    
                    const result = await fileUpload(image.path, "IMAGES", "image");
                    imageData.push({imageId: result.public_id, imageUrl: result.secure_url});
                  }
            }
            //Upload videos to cloudinary
            const videos= req.files["video"]
            if (videos) {
                for (const video of videos) {
                    console.log(video.mimetype);
                    const result = await fileUpload(video.path, "VIDEOS", "video");
                    videoData.push({videoId: result.public_id, videoUrl: result.secure_url});
                  }
              }
            
            const details={
                creatorId,
                creator,
                body,
                imageData,
                videoData
            }

            const newPost= await PostService.createPost(details)

            const response= new PostDto()
            response.id= newPost._id
            response.creatorId= newPost.creatorId
            response.creator= newPost.creator
            response.body= newPost.body
            response.imageData= newPost.imageData
            response.videoData= newPost.videoData
            response.likes= newPost.likes.length
            response.comments= newPost.comments

            res.status(201).json({
                status:"success",
                data:response
            })

        }
    } catch (error) {
        res.json({
            status:"error",
            msg:error.message
        })
    }
}

const getMyPosts= async (req: Request, res:Response) => {
    try {
        const id: any= req["user"].id
        const posts= await PostService.findPostsByCreatorId(id)
        let response: any[]= []
        posts.forEach(post=>{
            const postDto= new PostDto()
            postDto.id= post._id
            postDto.creatorId= post.creatorId
            postDto.creator= post.creator
            postDto.body= post.body
            postDto.imageData= post.imageData
            postDto.videoData= post.videoData
            postDto.likes= post.likes.length
            postDto.comments= post.comments
            response.push(postDto)
        })

        res.status(200).json({
            status:"success",
            data:response
        })
    } catch (error) {
        res.json({
            status:"error",
            msg:error.message
        })
    }
}

const getSinglePost= async (req: Request, res: Response) => {
    try {
        const postId: string= req.params.postId
        if( !mongoose.Types.ObjectId.isValid(postId)){
            res.status(400)
            throw new Error(`Invalid post id: ${postId}`)
        }

        const post= await PostService.findPostById(postId)
        if(!post){
            res.status(400)
            throw new Error(`Post with id: ${postId} not found.`)
        }

        const postDto= new PostDto()
        postDto.id= post._id
        postDto.creatorId= post.creatorId
        postDto.creator= post.creator
        postDto.body= post.body
        postDto.imageData= post.imageData
        postDto.videoData= post.videoData
        postDto.likes= post.likes.length
        postDto.comments= post.comments

        res.status(200).json({
            status:"success",
            data:postDto
        })
    }catch(error){
        res.json({
            status:"error",
            msg:error.message
        })
    }

}

const likeOrUnlikePost= async (req: Request, res:Response) => {
    try {
        const postId: string= req.params.postId

        if( !mongoose.Types.ObjectId.isValid(postId)){
            res.status(400)
            throw new Error(`Invalid post id: ${postId}`)
        }
        
        const likerId= req["user"].id
        const liker= await UserService.findUserById(likerId)
        const findPost= await PostService.findPostById(postId)
        if(!findPost){
            res.status(400)
            throw new Error(`Post with id: ${postId} not found.`)
        }

        //check if user has already liked the post and unlike if true
        const likes: any[]=findPost.likes
        if(findPost.likes.includes(likerId)){
            const updateLikes=likes.filter(like=> like != likerId)
            
            await PostService.updatePost(postId, {likes: updateLikes})

            res.status(200).json({
                status:"success",
                msg:`You unliked ${findPost.creator} post with id: ${postId}.`
            })
        }else{
            const updateLikes=[...likes, likerId]
            await PostService.updatePost(postId, {likes: updateLikes})

            res.status(200).json({
                status:"success",
                msg:`You liked ${findPost.creator} post with id: ${postId}.`
            })
        }

    } catch (error) {
        res.json({
            status:"error",
            msg:error.message
        })
    }
}

const getFeed= async (req: Request, res: Response) => {
    try {
        const userId= req["user"].id

        const existingUser= await UserService.findUserById(userId)
        const followings: any[]= existingUser.following
        const posts: any[]= []
        for (const following of followings) {
            const followingPosts= await PostService.findPostsByCreatorId(following)
            posts.push(followingPosts)
        }

        const response: any[]= []
        posts.forEach(userPosts=>{
            userPosts.forEach(post=>{
            
            const postDto= new PostDto()
            postDto.id= post._id
            postDto.creatorId= post.creatorId
            postDto.creator= post.creator
            postDto.body= post.body
            postDto.imageData= post.imageData
            postDto.videoData= post.videoData
            postDto.likes= post.likes.length
            postDto.comments= post.comments
            response.push(postDto)
                
            })
        })
        console.log(response);
        
        res.status(200).json({
            status:"success",
            data:response
        })
    } catch (error) {
        res.status(500).json({
            status:"error",
            msg:error.message
        })
    }
}

const commentOnPost= async (req: Request, res: Response) => {
    try {
        const postId: string= req.params.postId
        
        if( !mongoose.Types.ObjectId.isValid(postId)){
            res.status(400)
            throw new Error(`Invalid post id: ${postId}`)
        }
        const commenterId= req["user"].id
        const commenter= await UserService.findUserById(commenterId)
        const commenterName= `${commenter.firstName} ${commenter.lastName}`
        const findPost= await PostService.findPostById(postId)
        if(!findPost){
            res.status(400)
            throw new Error(`Post with id: ${postId} not found.`)
        }
        const commentDetails={
            id:commenterId,
            name:commenterName,
            comment:req.body.comment
        }
        const comments= [...findPost.comments, commentDetails]
       const updatedPost= await PostService.updatePost(postId, {comments})

       const response= new PostDto()
       response.id= updatedPost._id
       response.creatorId= updatedPost.creatorId
       response.creator= updatedPost.creator
       response.body= updatedPost.body
       response.imageData= updatedPost.imageData
       response.videoData= updatedPost.videoData
       response.likes= updatedPost.likes.length
       response.comments= updatedPost.comments

        res.status(200).json({
            status:"success",
            msg:`You commented on ${findPost.creator} post with id: ${postId}.`,
            data: response
        })

    } catch (error) {
        res.status(500).json({
            status:"error",
            msg:error.message
        })
    }
}

export{
    createPost,
    getMyPosts,
    getSinglePost,
    likeOrUnlikePost,
    commentOnPost,
    getFeed
}