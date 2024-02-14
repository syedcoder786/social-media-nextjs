import express from "express"
const app = express();
import dotenv from "dotenv"
dotenv.config()
import colors from "colors"
import cors from "cors";
app.use(cors());
import connectDB from "./config/db.js";
connectDB();

const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

import userRoutes from "./routes/userRoutes.js";
app.use("/api/users", userRoutes);
import postRoutes from "./routes/postRoutes.js";
app.use("/api/post", postRoutes);


// // Next js is a server side language and cannot be static
// // Serve frontend
// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname, "../frontend/build")));

//   app.get("*", (req, res) =>
//     res.sendFile(
//       path.resolve(__dirname, "../", "frontend", "build", "index.html")
//     )
//   );
// }
// else {
//   app.get('/', (req, res) => res.send('Please set to production'))
// }

// app.use(errorHandler)

const server = app.listen(port, () => console.log(`Server started on port ${port}`.bold));

//socket code
import {Server} from 'socket.io';
global.io = new Server(server, {
    // pingTimeout: 60000,
    // cors: {
    //   origin: "http://localhost:3000",
    //   // credentials: true,
    // },
    cors:{
        origin: "*",
        methods: ["GET", "POST"],
        allowedHeaders: ["my-custom-header"],
        credentials: true
    }
});

import { chat } from './socket/chat.js'
import { post } from './socket/post.js'
io.on("connect",(socket) => {
    console.log(`Socket connected to ${socket.id}`)

    socket.on('join', ({ name, room }) => {
        console.log(`${name} joined room ${room}`)
        app.set("socket", socket);
        // chat(io, socket)
    })
    socket.on('disconnect', () => {
        console.log('disconnected')
    })
})
