import express from 'express'
import { required, userMiddleware, attendMiddleware, attendUserMiddleware, existAttendMiddleware } from '../middleware'
import { attend } from '../db-api'
import { handleError } from '../utils'

const app = express.Router()

// GET /api/attend/:id
app.get('/:id', attendMiddleware, (req, res) => {
    try {
      res.status(200).json(req.attend)
    } catch (error) {
      handleError(error, res)
    }
})

// GET /api/attend/user/:id
app.get('/user/:id', attendUserMiddleware, (req, res) => {
    try {
      res.status(200).json(req.attends)
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
        const idAssist = req.attend.assists[req.attend.assists.length - 1]._id
        const assist = await attend.findAssistById(idAssist)
        if(assist.leave) {
          const saveAssist = await attend.createEnterAssist(req.attend)
          res.status(201).json({ message: 'Assist saved', response: saveAssist })
        }
        else {
          res.status(201).json({ message: 'Ya marcó entrada', response: assist })
        }
      } else {
        const saveAttend = await attend.createAttend(att)
        res.status(201).json({ message: 'Attend saved', response: saveAttend })
      }
    } else {
      res.status(201).json({ message: 'Usuario no registrado', response: {} })
    }
  } catch (error) {
    handleError(error, res)
  }

})

// POST /api/attend/leave/user/:id
// app.post('/', required, async (req, res) => {
app.post('/leave/user/:id', userMiddleware, existAttendMiddleware, async (req, res) => {
  try {
    if (req.user) {
      if (req.attend) {
        const idAssist = req.attend.assists[req.attend.assists.length - 1]._id
        const assist = await attend.findAssistById(idAssist)
        if(assist.leave) {
          res.status(201).json({ message: 'Primero debe marcar entrada, antes de salida', response: assist })
        }
        else {
          const saveAssist = await attend.createLeaveAssist(assist)
          res.status(201).json({ message: 'Assist saved', response: await attend.findAssistById(saveAssist._id) })
        }
      } else {
        res.status(201).json({ message: 'Primero debe marcar entrada', response: {} })
      }
    } else {
      res.status(201).json({ message: 'Usuario no registrado', response: {} })
    }
  } catch (error) {
    handleError(error, res)
  }

})

export default app