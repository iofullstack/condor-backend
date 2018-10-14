import express from 'express'
import { required, c_menuMiddleware } from '../middleware'
import { c_menu } from '../db-api'
import { handleError } from '../utils'

const app = express.Router()

// GET /api/c_menu
app.get('/', async (req, res) => {
    try {
        const cm = await c_menu.findAll()
        res.status(200).json(cm)
    } catch (error) {
        handleError(error, res)
    }
})

// GET /api/c_menu/:id
app.get('/:id', c_menuMiddleware, (req, res) => {
    try {
        res.status(200).json(req.c_menu)
    } catch (error) {
        handleError(error, res)
    }
})

// POST /api/c_menu
// app.post('/', required, async (req, res) => {
app.post('/', async (req, res) => {
    const { name, color } = req.body
    try {
        const savedCategoryMenu = await c_menu.create( { name, color } )
        res.status(201).json({
            message: 'Category Menu saved',
            response: savedCategoryMenu
        })
    } catch(error) {
        handleError(error, res)
    }
})

export default app
