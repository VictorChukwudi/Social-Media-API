import Post from "../models/post.model";
import paginate from "mongoose-paginate-v2"

export class PostService{
    static async createPost(details: { creatorId: any; creator: string; body: string;
        imageData?: object[]; videoData?: object[]; }){
        const {creatorId, creator, body, imageData, videoData}= details
        const post=await new Post({
            creatorId,
            creator,
            body,
            imageData,
            videoData
        }).save()

        return post
    }

    static async findPostById(id: string){
        const post= await Post.findById(id)
        return post
    }

    static async findPostsByCreatorId(id: string){
        const posts= await Post.find({creatorId: id})
        return posts
    }

    static async updatePost(id: string, update: object){
        const user= await Post.findByIdAndUpdate(id, update, {new: true})
        return user
    }
}