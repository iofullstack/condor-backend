import express from 'express'
import { required, tableMiddleware } from '../middleware'
import { table } from '../db-api'
import { handleError } from '../utils'

const app = express.Router()

// GET /api/tables
app.get('/', async (req, res) => {
  try {
    const tables = await table.findAll()
    res.status(200).json(tables)
  } catch (error) {
    handleError(error, res)
  }
})

// GET /api/tables/:id
app.get('/:id', tableMiddleware, (req, res) => {
  try {
    res.status(200).json(req.table)
  } catch (error) {
    handleError(error, res)
  }
})

// GET /api/tables/reset/:id
app.get('/reset/:id', async (req, res) => {
  try {
    const io = req.app.get('io')
    const id = req.params.id, people = 0
    await table.updateOccupied(id, people)
    io.emit('refreshTables')
    res.status(200).json({ message: 'Table reset' })
  } catch (error) {
    handleError(error, res)
  }
})

// POST /api/tables
app.post('/', async (req, res) => {
  const t = req.body

  try {
    const savedTable = await table.create(t)
    res.status(201).json({
      message: 'Table saved',
      response: savedTable
    })
  } catch (error) {
    handleError(error, res)
  }
})

export default app
