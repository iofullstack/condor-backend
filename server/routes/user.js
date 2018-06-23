import express from 'express'
import { user } from '../db-api'
import { handleError } from '../utils'
import { userMiddleware } from '../middleware'

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
// app.post('/', async (req, res) => {
//   const { firstName, lastName, email, password } = req.body
//   const u = new User({
//     ci,
//     exp,
//     firstName,
//     lastName,
//     avatar,
//     email,
//     password,
//     gender,
//     birthdate,
//     address,
//     cellphone,
//     createdAt,
//     role,
//     permits,

//     firstName,
//     lastName,
//     email,
//     password: hash(password, 10)
//   })

//   try {
//     const savedUser = await user.create(u)
//     debug(`Creating new user: ${savedUser}`)
//     const token = createToken(user)
//     res.status(201).json({
//       message: 'User saved',
//       token,
//       userId: user._id,
//       firstName,
//       lastName,
//       email
//     })
//   } catch (error) {
//     handleError(error, res)
//   }

// })

export default app
