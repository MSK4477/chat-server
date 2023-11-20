import { Router } from "express";
import { getUser } from "../controllers/userControll.js";
import Protected from "../middleware/authMiddleware.js";
const userRouter = Router()

userRouter.get("/getUser", getUser, Protected)


export default userRouter

