import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../data/model/userModel.js";
import dotenv from "dotenv";
dotenv.config();

const protect = asyncHandler(async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    res.status(403).json({ error: "Unauthorized User" });
    return;
  }
  try {
    const decodeToken = await jwt.verify(token, process.env.SECRET_KEY);
    const findUser = await User.findOne({ _id: decodeToken.id });
    console.log(decodeToken.id, "user")
    if (!findUser) {
      res.status(403).json({ error: "User Not Authorized" });
      return;
    }
    req.id = findUser._id;

   
    next();
  } catch (err) {
    console.log(err);
  }
});

export default protect;

