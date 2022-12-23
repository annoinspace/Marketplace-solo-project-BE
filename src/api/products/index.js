// route handlers for the products
import express from "express"
import httpErrors from "http-errors"
import uniqid from "uniqid"
import { triggerProductBadRequest, checkProductSchema } from "./validator.js"
import { getProducts, writeProducts } from "../../lib/fs-tools.js"

const { NotFound } = httpErrors

const productsRouter = express.Router()

productsRouter.post("/", triggerProductBadRequest, checkProductSchema, async (req, res, next) => {
  try {
    const newProduct = {
      _id: uniqid(),
      ...req.body,
      createdAt: new Date()
    }
    const productsArray = await getProducts()
    productsArray.push(newProduct)
    writeProducts(productsArray)
    res.status(201).send({ _id: newProduct._id })
  } catch (error) {
    console.log("----error adding new product-----")
    next(error)
  }
})

productsRouter.get("/", async (req, res, next) => {
  try {
    const productsArray = await getProducts()
    res.status(200).send(productsArray)
  } catch (error) {
    console.log("----error loading products-----")
    next(error)
  }
})

productsRouter.get("/:productId", async (req, res, next) => {
  try {
    const productsArray = await getProducts()
    const product = productsArray.find((product) => product._id === req.params.productId)
    if (product) {
      res.status(200).send(product)
    } else {
      next(NotFound(`Unfortunately the product with id:${req.params.productId} was not found!`))
    }
  } catch (error) {
    console.log("----error loading products-----")
    next(error)
  }
})

productsRouter.delete("/:productId", async (req, res, next) => {
  try {
    const productsArray = await getProducts()
    const remainingProducts = productsArray.filter((product) => product._id === req.params.productId)
    if (remainingProducts.length !== productsArray.length) {
      await writeProducts(remainingProducts)
      res.status(204).send()
    } else {
      next(NotFound(`Unfortunately the product with id:${req.params.productId} was not deleted!`))
    }
  } catch (error) {
    console.log("----error deleting products-----")
    next(error)
  }
})

productsRouter.put("/:productId", async (req, res, next) => {
  try {
    const productsArray = await getProducts()
    const index = productsArray.findIndex((product) => product._id === req.params.productId)
    const oldProductInfo = productsArray[index]
    const updatedProductInfo = { ...oldProductInfo, ...req.body, updatedAt: new Date() }
    productsArray[index] = updatedProductInfo
    await writeProducts(productsArray)
    res.send(updatedProductInfo)
  } catch (error) {
    console.log("----error updating product-----")
    next(error)
  }
})

export default productsRouter
