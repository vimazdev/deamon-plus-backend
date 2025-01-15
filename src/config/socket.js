import { Server } from 'socket.io'

export default function initializeSocket(httpServer) {
    const io = new Server(httpServer, {
        cors: {
            origin: process.env.FRONTEND_URL || process.env.DEV_FRONTEND_URL || "http://localhost:4000",
            methods: ["GET", "POST"]
        }
    })

    io.on('connection', (socket) => {
        console.log('Client connected:', socket.id)

        socket.on('disconnect', () => {
            console.log('Client disconnected:', socket.id)
        })
    })

    return io
}
