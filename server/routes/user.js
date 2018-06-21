import express from 'express'
import { user } from '../db-api'
import { handleError } from '../utils'

const app = express.Router()

// GET /api/users
app.get('/', async (req, res) => {
  try {
    const users = await user.findAll()
    res.status(200).json(users)
  } catch (error) {
    handleError(error, res)
  }
})

export default app
