import { client } from '../db-api'
import { handleError } from '../utils'

export const clientMiddleware = async (req, res, next) => {
  try {
    req.client = await client.findById(req.params.id)
    next()
  } catch (err) {
    handleError(err, res)
  }
}

export const clientCIMiddleware = async (req, res, next) => {
  try {
    req.client = await client.findByCI(req.params.ci)
    next()
  } catch (err) {
    handleError(err, res)
  }
}
