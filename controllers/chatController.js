import asyncHandler from "express-async-handler";
import Chat from "../data/model/chatModel.js";


export const  createChat = asyncHandler(async(req, res) => {

    const { message } = req.body
    
try{
    const newChat = await Chat.create({
       message: message,
        author:req.id
    })
    res.status(200).json({message:"Created New Chat", code:0, chat:newChat})

}catch(err) { 
    res.status(400).json({error:"Failed To Create New Chat" ,code:0, message})
    throw new Error("Invalid data. Please check the provided data.")
}
}) 

export const getChat = asyncHandler(async(req,res) =>  {


    const { id } = req.id
try{
    if(id) { 
        const chats = await Chat.find({author:id})
res.status(200).json({message: "Fetched The Chats Successfully", code: 1, chats})
    }
}catch(err) { 
    res.status(400).json({error:"Can't Get The Chats", err, code: 0})
}
})
