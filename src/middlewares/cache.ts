import {Request, Response, NextFunction} from "express"
import { client } from "../config/redis"
import { paginateFeed } from "../helpers/util.functions"


const MyPostsCache= async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id= req["user"].id
        const key= `${id}/posts`
        const cachedPosts= await client.get(key)
        // const posts=[]
        if (cachedPosts) {
            console.log("from cache")
            const page=Number(req.query.page)
            const result= JSON.parse(cachedPosts)
            
            //implement pagination for cached data
            if(!page || page < 1){
                res.status(200).json({
                    status:"success",
                    data:{
                        posts: result
                    }
                })
            }else{
                const {paginatedPosts, currentPage, totalPages }= paginateFeed(result, page, 5)
                res.status(200).json({
                    status:"success",
                    data:{
                        posts: paginatedPosts,
                        currentPage,
                        totalPages
                    }
                })
            }
        }else{
            console.log("from db");
            
            next()
        }
    } catch (error) {
        res.status(500).json({
            status:"error",
            msg: error.message
        })
    }
}
const FeedCache= async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id= req["user"].id
        const key= `${id}/feed`
        const cachedPosts= await client.get(key)
        // const posts=[]
        if (cachedPosts) {
            console.log("from cache")
            const page=Number(req.query.page)
            const result= JSON.parse(cachedPosts)
            
            //implement pagination for cached data
            if(!page || page < 1){
                res.status(200).json({
                    status:"success",
                    data:{
                        posts: result
                    }
                })
            }else{
                const {paginatedPosts, currentPage, totalPages }= paginateFeed(result, page, 5)
                res.status(200).json({
                    status:"success",
                    data:{
                        posts: paginatedPosts,
                        currentPage,
                        totalPages
                    }
                })
            }
        }else{
            console.log("from db");
            
            next()
        }
    } catch (error) {
        res.status(500).json({
            status:"error",
            msg: error.message
        })
    }
}

export{
    MyPostsCache,
    FeedCache
}