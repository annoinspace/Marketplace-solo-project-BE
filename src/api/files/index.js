import express from "express"
import multer from "multer"
import { extname } from "path"
import { writeProducts, getProducts, saveCoverPhoto } from "../../lib/fs-tools.js"

const filesRouter = express.Router()

filesRouter.post("/:productId/upload", multer().single("imageUrl"), async (req, res, next) => {
  try {
    const originalFileExtension = extname(req.file.originalname)
    const fileName = req.params.productId + originalFileExtension
    await saveCoverPhoto(fileName, req.file.buffer)
    //   url to use for the mew image
    const url = `http://localhost:3001/img/${fileName}`
    console.log("url", url)

    const products = await getProducts()
    const index = products.findIndex((product) => product._id === req.params.productId)
    //   updating the blog cover
    if (index !== -1) {
      const oldProduct = products[index]
      const coverUpdate = { ...oldProduct, imageUrl: url }
      const updatedProduct = { ...oldProduct, coverUpdate, updatedAt: new Date() }
      products[index] = updatedProduct
      await writeProducts(products)
    }
    res.send("product image updated")
  } catch (error) {
    next(error)
  }
})

export default filesRouter
