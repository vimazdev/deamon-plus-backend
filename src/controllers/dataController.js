import pool from '../config/db.js'

export const insertData = async (req, res, io) => {
    try {
        const { data } = req.body

        const [result] = await pool.execute(
            'INSERT INTO user_transactions (field1, field2) VALUES (?, ?)',
            [data.field1, data.field2]
        )

        io.emit('newData', {
            id: result.insertId,
            ...data
        })

        res.status(200).json({ success: true, message: 'Data inserted successfully' })
    } catch (error) {
        console.error('Error:', error)
        res.status(500).json({ success: false, message: 'Error inserting data' })
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
