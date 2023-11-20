// import express from "express";
// import cors from "cors"
// import connectDb from "./data/connectToDb/connectToDb.js";
// import cookieParser from "cookie-parser";
// import userAuthRouter from "./routes/userAuth.js";
// import userRouter from "./routes/user.js";
// import chatRoute from "./routes/chat.js";
// import dotenv from "dotenv"
// import http from "http"
// import { Server } from "socket.io";
// await connectDb()


// const app = express()
// const server = http.createServer(app);

// const io = new Server(server, {
//   cors: {
//     origin: "http://localhost:5173",
//     methods: ["GET", "POST"],
//   },
// });

// io.on("connection", (socket) => {  
//   socket.on("join-room", (data) => {
//     socket.join(data);
//     console.log(`User ${socket.id} has joined the room.`);
//   });
//   socket.on("send-message", (data) => {
//     console.log("DATA SENT: ", data);
//     socket.to(data.room).emit("receive-message", data);
//   });
//   socket.on("disconnect", () => {
//     console.log("Disconnected.", socket.id);
//   });
// });

// app.use(cookieParser())
// app.use(express.json())

// const allowedOrgins = ["http://localhost:5173"]
// const corsOptions = {
//     origin:allowedOrgins,
//     credentials: true,
//   };
  
//   app.use(cors(corsOptions));

// dotenv.config()

// app.get( "/" ,(req, res) =>  {
//   res.status(200).json( "hello world")
//   console.log(req)
//   })

// app.use("/user", userAuthRouter)

// app.use("/user", userRouter)

// app.use("/chat", chatRoute)



// const PORT = 4000


// server.listen(PORT, () => console.log("app Listening on Port", PORT))

import express from "express";
import cors from "cors"
import connectDb from "./data/connectToDb/connectToDb.js";
import cookieParser from "cookie-parser";
import userAuthRouter from "./routes/userAuth.js";
import userRouter from "./routes/user.js";
import chatRoute from "./routes/chat.js";
import dotenv from "dotenv"
import http from "http"
import { Server } from "socket.io";

dotenv.config();

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials:true
  },
});
await connectDb()
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.status(200).send({ message: "Hello world!" });
});
app.use("/user", userAuthRouter)

app.use("/user", userRouter)

app.use("/chat", chatRoute)

const PORT = 4000;

io.on('connection', (socket) => {
  // console.log(`User connected: ${socket.id}`);

  socket.on('join-room', (data) => {
    const { room } = data;
    socket.join(room);
    console.log(`User ${socket.id} joined room ${room}`);
  });

  socket.on('send-message', (data) => {
    console.log('Received message from client:', data);

    io.to(data.room).emit('receive-message', data);
  });

  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

server.listen(PORT, () => {
  console.log(`App is running on PORT ${PORT}`);
});
