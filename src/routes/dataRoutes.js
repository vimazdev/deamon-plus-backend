import express from 'express'
import { insertData, getAllData } from '../controllers/dataController.js'

const router = express.Router()

router.post('/', (req, res) => insertData(req, res, req.app.get('io')))
router.get('/', getAllData)

export default router
