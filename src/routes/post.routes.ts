import express from "express"
import { commentOnPost, createPost, getFeed, getMyPosts, getPaginatedFeed, getSinglePost, likeOrUnlikePost } from "../controllers/post.controllers"
import { upload } from "../config/multer"
import validate from "../middlewares/validation"
import { commentSchema, postSchema } from "../helpers/validators"




const router= express.Router()

router.get("/", getPaginatedFeed)
router.get("/personal", getMyPosts)
router.post("/create", [upload.fields([{name:"image"}, {name:"video"}]), validate(postSchema)], createPost)
router.get("/:postId", getSinglePost)
router.get("/:postId/like", likeOrUnlikePost)
router.post("/:postId/comment", [validate(commentSchema)], commentOnPost)


export default router