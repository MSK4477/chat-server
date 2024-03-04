import sendEmail from "../utils/sendMail.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import generateAccessToken from "../utils/tokenGenarator.js";
import hashPassword from "../utils/passwordsHasher.js";
import User from "../data/model/userModel.js";
import asyncHandler from "express-async-handler";
import dotenv from "dotenv";
dotenv.config();

const generateToken = (email) => {
  return jwt.sign({ email }, process.env.SECRET_KEY, { expiresIn: "1d" });
};

export const register = asyncHandler(async (req, res) => {
  const { name, email, password, phone } = req.body;

  const user = await User.findOne({ email: email });

  if (user) {
    res.status(409).json({ error: "User Already Exist", code: 0 });
    return;
  }

  const Token = generateToken(email);
  const link = `https://master--illustrious-taiyaki-be5c11.netlify.app/verify?token=${Token}`;
  const to = email;
  const subject = ` Verify Your Email  `;
  const text = `<h1>Hello ${name} !!</h1>         
<p>Verify Your Email By Clicking The Link Below</p> </br>
<a href=${link}>${link}</a>`;
  sendEmail(to, subject, text);
  const Password = await hashPassword(password);
  console.log("pass", Password);
  const newUser = await User.create({
    name: name,
    email: email,
    password: Password,
    phone: phone,
    temproaryToken: Token,
  });

  res
    .status(200)
    .json({ newUser, message: "User Registred Successfully", code: 1 });
});

export const verify = asyncHandler(async (req, res) => {
  const { token } = req.query;

  const verifyToken = await jwt.verify(token, process.env.SECRET_KEY);
  

  if (verifyToken) {
    const user = await User.findOne({ email: verifyToken.email });

    if (user) {
      user.verified = true;
      user.temproaryToken = "";
      await user.save();
      res
        .status(200)
        .json({ message: "User Verified Succesfully", code: 1, user });
    return;
      }
    return;
  }
  res.status(400).json({ error: "user Not Verified", code: 0 });
  throw new Error("User Not Verified");
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email: email });
  if(!user) { 
    res.status(400).json({error: "User Not Found With That E-mail", code:0})
    return;       
  }
  if (user) {
    const comparePassword = await bcrypt.compare(password, user.password);

    if(!comparePassword) { 
      res.status(400).json({error: "Password Dosen't Match", code: 0})
    return;
    }

    if (comparePassword) {
      generateAccessToken(res, user._id);
      res
        .status(200)
        .json({ message: "User Logged In Successfully", code: 1, user: user });
      req.id = user._id;


    } else {
      res.status(400).json({ error: "User Login Failed", code: 0 });
      //   new Error("Login Failed");
    }

    return;
  }
});

export const logout = asyncHandler(async(req, res) =>  {

  try  {
await  res.clearCookie("token")
res.status(200).json({message: "User Logged out Succesfully", code: 1})  
}catch(err) { 
  console.log(err)
  res.status(500).json({error:  "Internal Server Error", code :0})
}


})

export const forgotpassword = asyncHandler(async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email: email });

  if (!user) {
    res
      .status(409)
      .json({ error: "User With This Email Is Not Found", code: 0 });
    return;
  }

  const token = generateToken(email);

  const resetLink = `http://localhost:5173/resetpassword?token=${token}`;

  const to = email;

  const subject = `Reset Password`;

  const text = `<h1>Hello ${user.name} !!</h1> 
  
  <p>Reset Your Password By Clicking The Link Below</p> </br>

  <a href=${resetLink}> ${resetLink} </a>`;

  sendEmail(to, subject, text);

  res.status(200).json({ message: "Reset Link Has Send Check Your Email" });
});

export const resetpassword = asyncHandler(async(req, res) =>   {

  const {token} = req.query

  const {password}  = req.body

  const verifyToken = jwt.verify(token, process.env.SECRET_KEY)

  if (verifyToken) {  
    
    const user = await User.findOne({email: verifyToken.email})

    if(!user) { 
      res.status(409).json({error:"User Not Found", code : 0})
    }
    const hashed = await hashPassword(password) 
console.log(hashed)
    const UpdateUser = await  User.findById({_id: user._id})
    UpdateUser.password = hashed
    console.log(UpdateUser)
    await UpdateUser.save()
    res.status(200).json({message:  "Password Changed Succesfully", code:1, hashed})

  }
})

