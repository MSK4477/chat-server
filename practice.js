import http from "http";
import {Server} from "socket.io"

const server = http.createServer();

const io = new Server(server, {  
    cors: { 
        origin:"url",
        credentials:true,
        methods:["POST", "GET"]
    }
})

io.on("connect", (socket) => { 
    console.log(`user connected ${socket.id}`)

    socket.on("join-room", (data) => { 
        
        socket.join(data.room)
        console.log(`user joined the room ${data.room}`)
    })

    socket.on("send-message", (data) => { 
        console.log(data, "from user")
        io.to(data.room).emit("receive-message", data)
    })
})
const PORT = 2000;

server.listen(PORT, () => { 
    console.log(`server listening on port ${PORT}`)
})