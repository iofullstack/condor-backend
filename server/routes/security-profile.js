import express from 'express'
import { required, s_profileMiddleware } from '../middleware'
import { s_profile } from '../db-api'
import { handleError } from '../utils'

const app = express.Router()

// GET /api/s_profile
app.get('/', async (req, res) => {
    try {
        const sp = await s_profile.findAll()
        res.status(200).json(sp)
    } catch (error) {
        handleError(error, res)
    }
})

// GET /api/s_profile/:id
app.get('/:id', s_profileMiddleware, (req, res) => {
    try {
        res.status(200).json(req.s_profile)
    } catch (error) {
        handleError(error, res)
    }
})

// POST /api/s_profile
// app.post('/', required, async (req, res) => {
app.post('/', async (req, res) => {
    const { name, permits } = req.body
    try {
        const savedSecurityProfile = await s_profile.create( {name, permits} )
        res.status(201).json({
            message: 'Security Profile saved',
            savedSecurityProfile
        })
    } catch(error) {
        handleError(error, res)
    }
})

export default app
