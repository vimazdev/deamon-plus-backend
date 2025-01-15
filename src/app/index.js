import express from 'express'
import cors from 'cors'
import dataRoutes from '../routes/dataRoutes.js'
import healthRoutes from '../routes/healthRoutes.js'

const app = express()

// Configuración de CORS
const allowedOrigins = [
    'http://localhost:4000', // Python ejecutándose localmente
    'https://your-netlify-site.netlify.app' // Cambia esto por la URL de tu frontend en Netlify
]

app.use(
    cors({
        origin: (origin, callback) => {
            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true)
            } else {
                callback(new Error(`CORS not allowed for origin: ${origin}`))
            }
        },
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Métodos permitidos
        allowedHeaders: [
            'Content-Type',
            'Authorization',
            'X-Requested-With'
        ], // Encabezados permitidos
        credentials: true // Habilita el envío de cookies si es necesario
    })
)

// Middleware para parsear JSON
app.use(express.json())

app.use('/api/data', dataRoutes)
app.use('/api/health', healthRoutes)

export default app
