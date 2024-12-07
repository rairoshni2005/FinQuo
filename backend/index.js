import express from "express";
import cors from 'cors';
import http from 'http';
import { Server } from 'socket.io';

const app = express();
const httpServer = http.createServer(app);
app.use(cors());

const io = new Server(httpServer, {
    cors: {
        origin: "*", // This CORS is for the socket server
    }
});

let rooms = ["Stocks", "Crypto Currency", ];

io.on("connection", (socket) => {
    console.log(`client connected with id ${socket.id}`);

    // Emit the available rooms when a user connects
    io.emit("loadRooms", rooms);

    // Join a room
    socket.on("joinRoom", (data) => {
        let room = rooms.find((name) => {
            return data.roomname === name;
        });

        if (room !== undefined) {
            socket.join(room);
            io.to(room).emit("roomJoined", `${data.username} joined the room`);
        }
    });

    // Handle receiving messages from clients
    socket.on("message", (data) => {
        console.log(data);
        io.emit("toclient", data); // Sends message to all connected clients
    });

    // Handle creating a new chat message and broadcasting it to a room
    socket.on("createChat", (data) => {
        io.to(data.roomname).emit("getChat", {
            username: data.username,
            message: data.message
        });
    });
});

httpServer.listen(8080, () => {
    console.log("server is up");
});
