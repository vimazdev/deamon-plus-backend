import { createServer } from 'http'
import app from './src/app/index.js'
import initializeSocket from './src/config/socket.js'

const httpServer = createServer(app)
const io = initializeSocket(httpServer)

app.set('io', io)

const PORT = process.env.PORT || 4000
httpServer.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
