import express from 'express'
import { required, orderDayMiddleware, orderMiddleware } from '../middleware'
import { order, saucer } from '../db-api'
import { handleError } from '../utils'

const app = express.Router()

// GET /api/orders
app.get('/', async (req, res) => {
  try {
    const orders = await order.findAll()
    res.status(200).json(orders)
  } catch (error) {
    handleError(error, res)
  }
})

// GET /api/orders/day/:day
app.get('/day/:day', orderDayMiddleware, async (req, res) => {
  try {
    res.status(200).json(req.orders)
  } catch (error) {
    handleError(error, res)
  }
})

// GET /api/orders/:id
app.get('/:id', orderMiddleware, (req, res) => {
  try {
    res.status(200).json(req.order)
  } catch (error) {
    handleError(error, res)
  }
})

// POST /api/orders
// app.post('/', required, async (req, res) => {
app.post('/', async (req, res) => {
  const o = req.body, saucers = []
  let savedSaucer

  try {
    for(let s of o.saucers) {
      savedSaucer = await saucer.create(s)
      saucers.push(savedSaucer._id)
    }
    o.saucers = saucers
    const savedOrder = await order.create(o)
    res.status(201).json({
      message: 'Order saved',
      savedOrder
    })
  } catch (error) {
    handleError(error, res)
  }
})

export default app
