import { handleError } from '../utils'
import base64ToImage from 'base64-to-image'

export const pathAvatarMiddleware = (req, res, next) => {
  try {
    req.img_path = './img/avatar/'
    next()
  } catch (err) {
    handleError(err, res)
  }
}

export const pathMenuMiddleware = (req, res, next) => {
  try {
    req.img_path = './img/menu/'
    next()
  } catch (err) {
    handleError(err, res)
  }
}

export const imageMiddleware = (req, res, next) => {
  try {
    let base64Str = req.body.image
    console.log(base64Str)
    if(base64Str) {
      let path = req.img_path
      let optionalObj = {'fileName': +new Date(), 'type':'png'}
  
      base64ToImage(base64Str, path, optionalObj)
  
      req.imageInfo = base64ToImage(base64Str, path, optionalObj)
    } else {
      req.imageInfo.fileName = 'default.png'
    }
    next()
  } catch (err) {
    handleError(err, res)
  }
}
