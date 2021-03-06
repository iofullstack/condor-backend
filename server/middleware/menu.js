import { menu } from '../db-api'
import { handleError } from '../utils'

export const menuMiddleware = async (req, res, next) => {
  try {
    req.menu = await menu.findById(req.params.id)
    next()
  } catch (err) {
    handleError(err, res)
  }
}

export const menuCategoryMiddleware = async (req, res, next) => {
  try {
    req.menu = await menu.findAllCategory(req.params.id)
    next()
  } catch (err) {
    handleError(err, res)
  }
}

export const priceMiddleware = async (req, res, next) => {
  try {
    req.price = await menu.findByIdPrice(req.params.id)
    next()
  } catch (err) {
    handleError(err, res)
  }
}

export const priceRemoveOfMenuMiddleware = async (req, res, next) => {
  try {
    req.deletePrice = await menu.removeListPriceOfMenu(req.params.idM, req.params.idP)
    next()
  } catch (err) {
    handleError(err, res)
  }
}

export const discountRemoveOfMenuMiddleware = async (req, res, next) => {
  try {
    req.deleteDiscount = await menu.removeListDiscountOfMenu(req.params.idM, req.params.idP)
    next()
  } catch (err) {
    handleError(err, res)
  }
}
