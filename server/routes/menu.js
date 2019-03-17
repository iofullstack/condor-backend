import express from 'express'
import { required, pathMenuMiddleware, imageMiddleware, menuMiddleware, menuCategoryMiddleware, priceMiddleware, priceRemoveOfMenuMiddleware, discountRemoveOfMenuMiddleware } from '../middleware'
import { menu } from '../db-api'
import { handleError } from '../utils'

const app = express.Router();

// GET /api/menu
app.get('/', async (req, res) => {
    try {
        const menus = await menu.findAll()
        res.status(200).json(menus)
    } catch (error) {
        handleError(error, res)
    }
})

// GET /api/menu/price/none
app.get('/price/none', async (req, res) => {
  try {
      const menus = await menu.findAllNonePrice()
      // console.log(menus)
      res.status(200).json(menus)
  } catch (error) {
      handleError(error, res)
  }
})

// GET /api/menu/category
app.get('/category/:id', menuCategoryMiddleware, async (req, res) => {
  try {
    res.status(200).json(req.menu)
  } catch (error) {
      handleError(error, res)
  }
})

// GET /api/menu/:id
app.get('/:id', menuMiddleware, (req, res) => {
    try {
      res.status(200).json(req.menu)
    } catch (error) {
      handleError(error, res)
    }
})

// POST /api/menu
app.post('/', pathMenuMiddleware, imageMiddleware, async (req, res) => {
  const m = req.body
  m.src = req.imageInfo.fileName

  try {
    const savedMenu = await menu.create(m)
    res.status(201).json({
      message: 'Menu saved',
      response: savedMenu
    })
  } catch (error) {
    handleError(error, res)
  }

})

// PATCH /api/menu/img
app.patch('/img', pathMenuMiddleware, imageMiddleware, async (req, res) => {
  const m = req.body
  m.src = req.imageInfo.fileName
  const d = {
    _id: m._id,
    src: m.src
  }

  try {
    const updateImgMenu = await menu.updateImg(d)
    res.status(201).json({
      message: 'Image update',
      response: updateImgMenu
    })
  } catch (error) {
    handleError(error, res)
  }
})

// PATCH /api/menu
app.patch('/', async (req, res) => {
  const m = req.body

  try {
    const updateMenu = await menu.update(m)
    res.status(201).json({
      message: 'Menu update',
      response: updateMenu
    })
  } catch (error) {
    handleError(error, res)
  }
})

// POST /api/menu/:id/price
// app.post('/:id/price', required, roleMiddleware, async (req, res) => {
app.post('/:id/price', menuMiddleware, async (req, res) => {
  const p = req.body
  const m = req.menu
  // console.log(p)
  try {
      const savedPrice = await menu.createPrice(m, p)
      res.status(201).json(savedPrice)
  } catch (error) {
      handleError(error, res)
  }
})

// POST /api/menu/:id/discount
app.post('/:id/discount', menuMiddleware, async (req, res) => {
  const d = req.body
  const m = req.menu
  // console.log(p)
  try {
      const savedDiscount = await menu.createDiscount(m, d)
      res.status(201).json(savedDiscount)
  } catch (error) {
      handleError(error, res)
  }
})

// GET /api/menu/price/:id
app.get('/price/:id', priceMiddleware, (req, res) => {
  try {
    res.status(200).json(req.price)
  } catch (error) {
    handleError(error, res)
  }
})

// GET /api/menu/:idM/price/:idP
app.delete('/:idM/price/:idP', priceRemoveOfMenuMiddleware, (req, res) => {
  try {
    console.log(req.deletePrice)
    res.status(200).json({
      message: 'Precio eliminado',
      response: req.deletePrice
    })
  } catch (error) {
    console.log(error)
    handleError(error, res)
  }
})

// GET /api/menu/:idM/discount/:idD
app.delete('/:idM/discount/:idD', discountRemoveOfMenuMiddleware, (req, res) => {
  try {
    console.log(req.deleteDiscount)
    res.status(200).json({
      message: 'Descuento eliminado',
      response: req.deleteDiscount
    })
  } catch (error) {
    console.log(error)
    handleError(error, res)
  }
})

export default app
