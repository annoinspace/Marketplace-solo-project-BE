// router for uploading files/images
import express from "express"
import multer from "multer"
import { extname } from "path"
import { getProducts, writeProducts, saveProductImage, saveCoverPhoto } from "../../lib/fs-tools.js"

const filesRouter = express.Router()

filesRouter.post("/:productId/upload", multer().single("imageUrl"), async (req, res, next) => {
  try {
    const originalFileExtension = extname(req.file.originalname)
    const fileName = req.params.productId + originalFileExtension
    await saveProductImage(fileName, req.file.buffer)
    const url = `http://localhost:3001/img/productImages/${fileName}`
    const products = await getProducts()
    const index = products.findIndex((product) => product._id === req.params.productId)
    if (index !== -1) {
      const oldProductInfo = products[index]
      const updatedProductInfo = { ...oldProductInfo, imageUrl: url, updatedAt: new Date() }
      products[index] = updatedProductInfo
      await writeProducts(products)
    }
    res.send("Product image updated")
  } catch (error) {
    res.send(error)
  }
})

// filesRouter.post(
//     "/:blogId/uploadCover",
//     multer().single("cover"),
//     async (req, res, next) => {
//       try {
//         const originalFileExtension = extname(req.file.originalname)
//         const fileName = req.params.blogId + originalFileExtension
//         await saveCoverPhoto(fileName, req.file.buffer)
//         //   url to use for the mew image
//         const url = `http://localhost:3001/img/users/${fileName}`

//         const blogs = await getBlogs()
//         const index = blogs.findIndex((blog) => blog._id === req.params.blogId)
//         //   updating the blog cover
//         if (index !== -1) {
//           const oldBlog = blogs[index]
//           // const coverUpdate = { ...oldBlog, cover: url }
//           const updatedBlog = { ...oldBlog, cover: url, updatedAt: new Date() }
//           blogs[index] = updatedBlog
//           await writeBlog(blogs)
//         }
//         res.send("Cover image updated")
//       } catch (error) {
//         next(error)
//       }
//     }
//   )

export default filesRouter
