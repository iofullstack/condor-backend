import express from 'express'
import { saucer } from '../db-api'
import { handleError } from '../utils'

const app = express.Router()

// GET /api/saucers
app.get('/', async (req, res) => {
  try {
    const saucers = await saucer.findAll()
    res.status(200).json(saucers)
  } catch (error) {
    handleError(error, res)
  }
})

export default app
