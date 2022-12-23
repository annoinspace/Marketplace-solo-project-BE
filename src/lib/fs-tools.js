import { fileURLToPath } from "url"
import { dirname, join } from "path"
import fs from "fs-extra"
import { writeFile } from "fs"
const { readJSON, writeJSON } = fs

// for the products
const dataFolderPath = join(dirname(fileURLToPath(import.meta.url)), "../data")
const productsJSONPath = join(dataFolderPath, "products.json")
const reviewsJSONPath = join(dataFolderPath, "reviews.json")

export const getProducts = () => readJSON(productsJSONPath)
export const getReviews = () => readJSON(reviewsJSONPath)
export const writeProducts = (productsArray) => writeJSON(productsJSONPath, productsArray)
export const writeReviews = (reviewsArray) => writeJSON(reviewsJSONPath, reviewsArray)

const publicFolderPath = join(process.cwd(), " ./public/img/productImages")
export const saveProductImage = (fileName, contentAsABuffer) => {
  writeFile(join(publicFolderPath, fileName), contentAsABuffer)
}
export const saveCoverPhoto = (fileName, contentAsABuffer) =>
  writeFile(join(publicFolderPath, fileName), contentAsABuffer)
