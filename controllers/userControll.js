import asyncHandler from "express-async-handler";
import User from "../data/model/userModel.js";
import jwt from "jsonwebtoken"
export const getUser = asyncHandler(async (req, res) => {
  try {
    const verifyToken = jwt.verify(req.cookies.token, process.env.SECRET_KEY)
    const user = await User.findOne({_id:verifyToken.id});
    if (user) {
      res.status(200).json({ message:"Users Found", user, code:1 });
    } else {
      res.status(404).json({ error: "Users Not Found", code: 0 });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export const updateUser = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    if (!id) {
      res.status(400).json({ error: "User ID is required", code: 0 });
      return;
    }

    const user = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (user) {
      res.status(200).json({ message: "User Updated Successfully", user, code:1 });
    } else {
      res.status(404).json({ error: "User Not Found", code: 0 });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});
