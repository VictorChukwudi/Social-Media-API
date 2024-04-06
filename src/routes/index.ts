import express from "express"
import authRoutes from "../routes/auth.routes"
import userRoutes from "../routes/user.routes"
import postRoutes from "../routes/post.routes"
import { authenticate } from "../middlewares/authentication"
const router= express.Router()

router.use("/auth", authRoutes)
router.use("/users", [authenticate], userRoutes)
router.use("/posts", [authenticate], postRoutes)

export default router