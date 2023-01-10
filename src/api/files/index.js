import express from "express"
import multer from "multer"
import { extname } from "path"
import { v2 as cloudinary } from "cloudinary"
import { CloudinaryStorage } from "multer-storage-cloudinary"
import { writeProducts, getProducts, saveCoverProductImage } from "../../lib/fs-tools.js"

const filesRouter = express.Router()
const cloudinaryUploader = multer({
  storage: new CloudinaryStorage({
    cloudinary,
    params: {
      folder: "marketplace"
    }
  })
}).single("imageUrl")

filesRouter.post("/:productId/upload", cloudinaryUploader, async (req, res, next) => {
  try {
    // const originalFileExtension = extname(req.file.originalname)
    // const fileName = req.params.productId + originalFileExtension
    // await saveCoverProductImage(fileName, req.file.buffer)
    //   url to use for the new image
    // const url = `http://localhost:3001/img/${fileName}`
    console.log(req.file)
    const url = req.file.path

    const products = await getProducts()
    const index = products.findIndex((product) => product._id === req.params.productId)
    //   updating the blog cover
    if (index !== -1) {
      const oldProduct = products[index]
      const coverUpdate = { imageUrl: url }
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
