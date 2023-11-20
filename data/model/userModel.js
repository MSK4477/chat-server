import { Schema, model } from "mongoose";
import validate from 'mongoose-validator';

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    validate: [
        validate({
          validator: 'isEmail',
          message: 'Please provide a valid email address.',
        }),
      ],
    unique: true,
  },
  phone: {
    type: Number,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  verified : {
    type: Boolean,
    default:false
  },
  temproaryToken : { 
    type: String,
    default:""
  }
});

const User = model ("chat_app_user", userSchema)

export default User
