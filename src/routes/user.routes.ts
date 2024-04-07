import express from "express"
import { followOrUnfollowUser, getFollowers, getFollowings, getNotifications } from "../controllers/user.controllers"



const router= express.Router()

router.get("/:userId/follow", followOrUnfollowUser)
router.get("/followers", getFollowers)
router.get("/followings", getFollowings)
router.get("/notifications", getNotifications)


export default router