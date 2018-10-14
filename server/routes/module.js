import express from 'express'
import { required, moduleMiddleware } from '../middleware'
import { module } from '../db-api'
import { handleError } from '../utils'

const app = express.Router()

// GET /api/modules
app.get('/', async (req, res) => {
    try {
        const modules = await module.findAll()
        res.status(200).json(modules)
    } catch (error) {
        handleError(error, res)
    }
})

// GET /api/modules/:id
app.get('/:id', moduleMiddleware, (req, res) => {
    try {
        res.status(200).json(req.module)
    } catch (error) {
        handleError(error, res)
    }
})

// POST /api/modules
// app.post('/', required, async (req, res) => {
app.post('/', async (req, res) => {
    const { name } = req.body
    try {
        const savedModule = await module.create( {name} )
        res.status(201).json({
            message: 'Module saved',
            response: savedModule
        })
    } catch(error) {
        handleError(error, res)
    }
})

// POST /api/modules/:id/permits
// app.post('/:id/permits', required, roleMiddleware, async (req, res) => {
app.post('/:id/permits', moduleMiddleware, async (req, res) => {
    const p = req.body
    const m = req.module
    try {
        const savedPermit = await module.createPermit(m, p)
        res.status(201).json({
            message: 'Permit saved',
            response: savedPermit
        })
    } catch (error) {
        handleError(error, res)
    }
})

export default app
