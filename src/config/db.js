import mysql from 'mysql2/promise'

const pool = mysql.createPool({
    host: process.env.DB_HOST || "bnwax4vm9te3saozejqh-mysql.services.clever-cloud.com", // Dirección del servidor MySQL
    user: process.env.DB_USER || "urpfcii22j9sct3j",      // Usuario
    password: process.env.DB_PASSWORD || "p9Pi8IB1qTayzlGjoqnX",  // Contraseña
    database: process.env.DB_NAME || "bnwax4vm9te3saozejqh",  // Base de datos
    port: process.env.DB_PORT || 3306,        // Puerto (3306 por defecto)
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});


export default pool
