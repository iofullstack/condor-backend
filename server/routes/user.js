import express from 'express'
import { user } from '../db-api'
import { handleError } from '../utils'
import { userMiddleware, pathAvatarMiddleware, imageMiddleware, userMiddlewareCI } from '../middleware'
import { hashSync as hash } from 'bcryptjs'

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

// GET /api/users/:id
app.get('/:id', userMiddleware, (req, res) => {
  try {
    res.status(200).json(req.user)
  } catch (error) {
    handleError(error, res)
  }
})

// GET /api/users/ci/:ci
app.get('/ci/:ci', userMiddlewareCI, (req, res) => {
  try {
    res.status(200).json(req.user)
  } catch (error) {
    handleError(error, res)
  }
})

// POST /api/users
app.post('/', pathAvatarMiddleware, imageMiddleware, async (req, res) => {
  const u = req.body
  u.password = hash(u.password, 10)
  u.avatar = req.imageInfo.fileName

  try {
    const savedUser = await user.create(u)
    res.status(201).json({
      message: 'User saved',
      savedUser
    })
  } catch (error) {
    handleError(error, res)
  }

})

export default app
