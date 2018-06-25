import express from 'express'
import { required, roleMiddleware } from '../middleware'
import { role } from '../db-api'
import { handleError } from '../utils'

const app = express.Router()

// GET /api/roles
app.get('/', async (req, res) => {
    try {
        const roles = await role.findAll()
        res.status(200).json(roles)
    } catch (error) {
        handleError(error, res)
    }
})

// GET /api/roles/:id
app.get('/:id', roleMiddleware, (req, res) => {
    try {
        res.status(200).json(req.role)
    } catch (error) {
        handleError(error, res)
    }
})

// POST /api/roles
// app.post('/', required, async (req, res) => {
app.post('/', async (req, res) => {
    const { title } = req.body
    try {
        const savedRole = await role.create( {title} )
        res.status(201).json({
            message: 'Role saved',
            savedRole
        })
    } catch(error) {
        handleError(error, res)
    }
})

// POST /api/roles/:id/permits
// app.post('/:id/permits', required, roleMiddleware, async (req, res) => {
app.post('/:id/permits', roleMiddleware, async (req, res) => {
    const p = req.body
    const r = req.role
    p.createdAt = new Date()
    try {
        const savedPermit = await role.createPermit(r, p)
        res.status(201).json({
            message: 'Permit saved',
            savedPermit
        })
    } catch (error) {
        handleError(error, res)
    }
})

export default app
