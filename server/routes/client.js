import express from 'express'
import { required, clientMiddleware, clientCIMiddleware } from '../middleware'
import { client } from '../db-api'
import { handleError } from '../utils'

const app = express.Router()

// GET /api/clients
app.get('/', async (req, res) => {
  try {
    const clients = await client.findAll()
    res.status(200).json(clients)
  } catch (error) {
    handleError(error, res)
  }
})

// GET /api/clients/:id
app.get('/:id', clientMiddleware, (req, res) => {
  try {
    res.status(200).json(req.client)
  } catch (error) {
    handleError(error, res)
  }
})

// GET /api/clients/ci/:ci
app.get('/ci/:ci', clientCIMiddleware, (req, res) => {
  try {
    res.status(200).json(req.client)
  } catch (error) {
    handleError(error, res)
  }
})

// POST /api/clients
// app.post('/', required, async (req, res) => {
app.post('/', async (req, res) => {
  const { nit_passport, firstName, lastName } = req.body
  const c = {
    nit_passport,
    firstName,
    lastName
  }

  try {
    const savedClient = await client.create(c)
    res.status(201).json({
      message: 'Client saved',
      response: savedClient
    })
  } catch (error) {
    handleError(error, res)
  }

})

export default app
