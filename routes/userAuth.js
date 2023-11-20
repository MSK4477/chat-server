import { login, register, verify, forgotpassword, resetpassword, logout } from "../controllers/userAuthControll.js";
import { Router } from "express";
const userRouter = Router();
userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.get("/logout", logout)
userRouter.get("/verify", verify);
userRouter.post("/forgotpassword", forgotpassword);
userRouter.post("/resetpassword", resetpassword);

export default  userRouter