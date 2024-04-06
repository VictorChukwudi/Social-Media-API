import express from "express"
import { followOrUnfollowUser } from "../controllers/user.controllers"



const router= express.Router()

router.get("/:userId/follow", followOrUnfollowUser)


export default router