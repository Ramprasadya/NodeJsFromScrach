import http from 'http'
import express from 'express'
import path from 'path'
import { Server } from 'socket.io'
import { fileURLToPath } from "url";

const app = express()
const server = http.createServer(app)

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.resolve(__dirname, "public")));

const io = new Server(server)

io.on("connection", (socket) => {
    socket.on("user-message", (message) => {
        io.emit("message", message)
    })
})

server.listen(8080, () =>
    console.log(`Server running on http://localhost:8080`)
)