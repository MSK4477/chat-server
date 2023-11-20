import {Schema, model} from 'mongoose';

const chatSchema = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: 'chat_app_user', 
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const Chat = model('Chats', chatSchema);

export default Chat;
