import express from 'express'
import { required, pathCategoryMiddleware, imageMiddleware, menuMiddleware } from '../middleware'
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

// GET /api/menu/:id
app.get('/:id', menuMiddleware, (req, res) => {
    try {
      res.status(200).json(req.menu)
    } catch (error) {
      handleError(error, res)
    }
})

// POST /api/menu
app.post('/', pathCategoryMiddleware, imageMiddleware, async (req, res) => {
  const m = req.body
  m.src = req.imageInfo.fileName

  try {
    const savedMenu = await menu.create(m)
    res.status(201).json({
      message: 'Menu saved',
      savedMenu
    })
  } catch (error) {
    handleError(error, res)
  }

})

export default app
