import express from 'express'
import { required, attendMiddleware, userMiddleware, existAttendMiddleware } from '../middleware'
import { attend } from '../db-api'
import { handleError } from '../utils'

const app = express.Router();

// GET /api/attend/:id
app.get('/:id', attendMiddleware, (req, res) => {
    try {
      res.status(200).json(req.attend)
    } catch (error) {
      handleError(error, res)
    }
})

// GET /api/attend/user/:id
app.get('/user/:id', attendMiddleware, (req, res) => {
    try {
      res.status(200).json(req.attend)
    } catch (error) {
      handleError(error, res)
    }
})

// POST /api/attend/enter/user/:id
// app.post('/', required, async (req, res) => {
app.post('/enter/user/:id', userMiddleware, existAttendMiddleware, async (req, res) => {
  const { title, description, icon } = req.body
  const q = {
    title,
    description,
    icon,
    user: req.user._id
  }
  try {
    const savedQuestion = await question.create(q)
    res.status(201).json(savedQuestion)
  } catch (error) {
    handleError(error, res)
  }

})

// POST /api/questions/:id/answers
app.post('/:id/answers', required, questionMiddleware, async (req, res) => {
  const a = req.body
  const q = req.question
  a.createdAt = new Date()
  a.user = new User(req.user)
  console.log(a.user)
  try {
    const savedAnswer = await question.createAnswer(q, a)
    res.status(201).json(savedAnswer)
  } catch (error) {
    handleError(error, res)
  }
})

export default app