import { Router } from "express"
import { createChat, getChat } from "../controllers/chatController.js";
import protect from "../middleware/authMiddleware.js"
const chatRoute = Router()



chatRoute.post("/create-chat", protect, createChat );
chatRoute.get("/get-chat", protect, getChat )

export default chatRoute