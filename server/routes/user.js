import express from 'express'
import { user } from '../db-api'
import { handleError } from '../utils'
import { userMiddleware } from '../middleware'
import { User } from '../models'
import { hashSync as hash } from 'bcryptjs'

const app = express.Router()

// GET /api/users
app.get('/', async (req, res) => {
  try {
    const users = await user.findAll()
    res.status(200).json(users)
  } catch (error) {
    handleError(error, res)
  }
})

// GET /api/users/:id
app.get('/:id', userMiddleware, (req, res) => {
  try {
    res.status(200).json(req.user)
  } catch (error) {
    handleError(error, res)
  }
})

// POST /api/users
app.post('/', async (req, res) => {
  const { ci, exp, firstName, lastName, avatar, email, password, gender, birthdate, address, cellphone, createdAt, role, permits } = req.body
  // const u = req.body
  const u = new User({
    ci, exp, firstName, lastName, avatar, email,
    password: hash(password, 10), gender, birthdate, address,
    cellphone, createdAt, role, permits
  })
  console.log(u)

  /*try {
    const savedUser = await user.create(u)
    debug(`Creating new user: ${savedUser}`)
    res.status(201).json({
      message: 'User saved',
      savedUser
    })
  } catch (error) {
    handleError(error, res)
  }*/

})

export default app
