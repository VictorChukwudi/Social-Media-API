import express from "express"
import { loginUser, registerUser } from "../controllers/auth.controllers"
import validate from "../middlewares/validation"
import { loginSchema, registerSchema } from "../helpers/validators"

const router= express.Router()


router.post("/register", [validate(registerSchema)], registerUser)
router.post("/login", [validate(loginSchema)], loginUser)


export default router