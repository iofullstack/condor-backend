import express from 'express'
import { required, orderDayMiddleware, orderMiddleware, orderDayArchivedMiddleware } from '../middleware'
import { order, saucer, table } from '../db-api'
import { handleError } from '../utils'
import { time } from '../config'

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

// GET /api/orders/today
app.get('/today', async (req, res) => {
  try {
    const day = time().toISOString().slice(0,10)
    const orders = await order.findAllDay(day, '-createdAt', true, true)
    res.status(200).json(orders)
  } catch (error) {
    handleError(error, res)
  }
})

// GET /api/orders/today/table/:id
app.get('/today/table/:id', async (req, res) => {
  try {
    const day = time().toISOString().slice(0,10)
    const orders = await order.findAllDayTable(day, req.params.id)
    res.status(200).json(orders)
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

// GET /api/orders/day/:day
app.get('/day/:day', orderDayArchivedMiddleware, async (req, res) => {
  try {
    let sales = [], extras = [], totalSales = 0, totalExtras = 0
    req.orders.forEach((element) => {
      element.saucers.forEach((el) => {
        let priceExtra = 0, match = false
        el.extra.forEach((ex) => {
          priceExtra += ex.price * el.quantity
          extras.push({
            _id : ex._id,
            name: ex.name,
            price: ex.price,
            quantity: el.quantity
          })
          totalExtras += ex.price * el.quantity
        })
        totalSales += el.price - priceExtra
        for(let i = 0; i < sales.length; i++) {
          if(sales[i]._id === el.menu._id) {
            match = true
            sales[i].price += el.price - priceExtra
            sales[i].quantity += el.quantity
          }
        }
        if(!match) {
          sales.push({
            _id: el.menu._id,
            name: el.menu.name,
            price: el.price - priceExtra,
            quantity: el.quantity
          })
        }
      })
    })
    res.status(200).json({sales, extras, totalExtras, totalSales})
  } catch (error) {
    handleError(error, res)
  }
})

// GET /api/orders/:id/hide
app.get('/:id/hide', async (req, res) => {
  try {
    const id = req.params.id
    const orderBox = await order.addBox(id)
    if(orderBox.error)
      res.status(200).json({ error: orderBox.error, message: orderBox.message })
    else {
      await order.updateViewed(id)
      res.status(200).json({ error: false, message: 'Pedido guardado y almacenado en caja' })
    }
  } catch (error) {
    handleError(error, res)
  }
})

// GET /api/orders/day/:day/amount
app.get('/day/:day/amount', orderDayMiddleware, async (req, res) => {
  try {
    let priceAll = 0;
    req.orders.forEach((element) => {
      element.saucers.forEach((el) => {
        console.log(el.price)
        priceAll += el.price
      })
    })
    res.status(200).json({ priceTotal: priceAll })
  } catch (error) {
    handleError(error, res)
  }
})

// POST /api/orders/extract
app.post('/extract', (req, res) => {
  try {
    const extract = req.body
    order.printExtract(extract)
    res.status(201).json({
      message: 'Imprimió extracto'
    })
  } catch (error) {
    handleError(error, res)
  }
})

// POST /api/orders/print/pago
app.post('/print/pago', (req, res) => {
  try {
    const pago = req.body
    order.printPago(pago)
    res.status(201).json({
      message: 'Imprimió pago'
    })
  } catch (error) {
    handleError(error, res)
  }
})

// POST /api/orders/print/cook
app.post('/print/cook', async (req, res) => {
  try {
    const obj = req.body
    order.printCook(await order.preparePrintCook2(obj))
    res.status(201).json({
      message: 'Imprimió pedido para cocina'
    })
  } catch (error) {
    handleError(error, res)
  }
})

// POST /api/orders
// app.post('/', required, async (req, res) => {
app.post('/', async (req, res) => {
  const o = req.body, saucers = [], day = time().toISOString().slice(0,10)
  const io = req.app.get('io')
  let savedSaucer, people = o.numPeople

  try {
    o.numOrder = (await order.countOrder(day)) + 1
    for(let s of o.saucers) {
      savedSaucer = await saucer.create(s)
      saucers.push(savedSaucer._id)
    }
    o.saucers = saucers
    for(let t of o.tables) {
      if (people > t.capacity) {
        await table.updateOccupied(t._id, t.capacity)
        people -= t.capacity
      }
      else
        await table.updateOccupied(t._id, people)
    }

    const savedOrder = await order.create(o)
    io.emit('refreshTables')
    res.status(201).json({
      message: 'Order saved',
      response: savedOrder
    })

    // console.log(savedOrder)
    order.printCook(await order.preparePrintCook(savedOrder))
  } catch (error) {
    handleError(error, res)
  }
})

export default app
