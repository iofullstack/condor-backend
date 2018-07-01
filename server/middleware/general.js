import { handleError } from '../utils'
import base64ToImage from 'base64-to-image'

export const imageMiddleware = (req, res, next) => {
  try {
    let base64Str = req.body.avatar
    let path = './img/'
    let optionalObj = {'fileName': +new Date(), 'type':'png'}

    base64ToImage(base64Str, path, optionalObj)

    req.imageInfo = base64ToImage(base64Str, path, optionalObj)
    next()
  } catch (err) {
    handleError(err, res)
  }
}
