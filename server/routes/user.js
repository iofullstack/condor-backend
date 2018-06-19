import express from 'express'
import {
    // required,
    // userMiddleware,
    usersMiddleware,
    users
} from '../middleware'

const app = express.Router()

// GET /api/users
app.get('/', usersMiddleware, (req, res) => {
    res.status(200).json(req,users)
})

