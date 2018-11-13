import express from 'express'
import { required, boxMiddleware, existBoxMiddleware } from '../middleware'
import { box } from '../db-api'
import { handleError } from '../utils'

const app = express.Router()

// GET /api/boxs
app.get('/', async (req, res) => {
  try {
    const boxs = await box.findAll()
    res.status(200).json(boxs)
  } catch (error) {
    handleError(error, res)
  }
})

// POST /api/boxs/opening
app.post('/opening', existBoxMiddleware, async (req, res) => {
  const { amount } = req.body
  let saveBox = {}

  try {
    if (req.box) {
      const boxPeriod = req.box.period[req.box.period.length - 1]
      if(boxPeriod.closing) {
        saveBox = await box.createOpeningPeriod(req.box, amount)
        res.status(201).json({ message: 'Volvió abrir caja en el día', response: saveBox })
      } else {
        res.status(201).json({ message: 'Ya abrió caja, ántes debe cerrarla', response: boxPeriod })
      }
    }
    else {
      saveBox = await box.createBox(amount)
      res.status(201).json({ message: 'Abrió caja', response: saveBox })
    }
  } catch (error) {
    handleError(error, res)
  }
})

// POST /api/boxs/closing
app.post('/closing', existBoxMiddleware, async (req, res) => {
  try {
    if (req.box) {
      const boxPeriod = req.box.period[req.box.period.length - 1]
      if(boxPeriod.closing) {
        res.status(201).json({ message: 'Primero debe abrir caja', response: boxPeriod })
      }
      else {
        const savePeriod = await box.createClosingPeriod(req.box)
        res.status(201).json({ message: 'Cerró caja', response: savePeriod })
      }
    } else {
      res.status(201).json({ message: 'No abrió caja en el día', response: {} })
    }
  } catch (error) {
    handleError(error, res)
  }
})

export default app
