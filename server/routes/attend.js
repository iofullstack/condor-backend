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
  const { note } = req.body

  try {
    if (req.user) {
      const att = { note, user: req.user._id }
      if (req.attend) {
        res.status(201).json({msg: "Ya marcaste entrada cabron!!"})
      } else {
        const saveAttend = await attend.createAttend(att);
        res.status(201).json(saveAttend)
      }
    } else {
      res.status(201).json({msg: note})
    }
  } catch (error) {
    handleError(error, res)
  }

})

// POST /api/questions/:id/answers
// app.post('/:id/answers', required, questionMiddleware, async (req, res) => {
//   const a = req.body
//   const q = req.question
//   a.createdAt = new Date()
//   a.user = new User(req.user)
//   console.log(a.user)
//   try {
//     const savedAnswer = await question.createAnswer(q, a)
//     res.status(201).json(savedAnswer)
//   } catch (error) {
//     handleError(error, res)
//   }
// })

export default app