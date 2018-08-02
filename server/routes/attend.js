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
        const idAssist = req.attend.assist[req.attend.assist.length - 1]._id
        const assist = await attend.findAssistById(idAssist)
        if(assist.leave) {
          const saveAssist = await attend.createEnterAssist(req.attend)
          res.status(201).json({error: false, response: saveAssist})
        }
        else {
          res.status(201).json({error: false, msg: "Ya marcó entrada"})
        }
      } else {
        const saveAttend = await attend.createAttend(att);
        res.status(201).json({error: false, response: saveAttend})
      }
    } else {
      res.status(201).json({error: false, msg: "Usuario no registrado"})
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
          const idAssist = req.attend.assist[req.attend.assist.length - 1]._id
          const assist = await attend.findAssistById(idAssist)
          if(assist.leave) {
            res.status(201).json({error: false, msg: "Primero debe marcar entrada, antes de salida"})
          }
          else {
            const saveAssist = await attend.createLeaveAssist(assist)
            res.status(201).json({error: false, response: await attend.findAssistById(saveAssist._id)})
          }
        } else {
          res.status(201).json({error: false, msg: "Primero debe marcar entrada, antes de salida"})
        }
      } else {
        res.status(201).json({error: false, msg: "Usuario no registrado"})
      }
    } catch (error) {
      handleError(error, res)
    }
  
  })

export default app