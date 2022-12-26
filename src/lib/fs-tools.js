import { fileURLToPath } from "url"
import { dirname, join } from "path"
import fs from "fs-extra"

const { readJSON, writeJSON, writeFile } = fs

// for the products
const dataFolderPath = join(dirname(fileURLToPath(import.meta.url)), "../data")
const productsJSONPath = join(dataFolderPath, "products.json")
const reviewsJSONPath = join(dataFolderPath, "reviews.json")

const publicFolderPath = join(process.cwd(), "public/img")
console.log("Public folder path in fs-tools-----------", publicFolderPath)

export const getProducts = () => readJSON(productsJSONPath)
export const getReviews = () => readJSON(reviewsJSONPath)
export const writeProducts = (productsArray) => writeJSON(productsJSONPath, productsArray)
export const writeReviews = (reviewsArray) => writeJSON(reviewsJSONPath, reviewsArray)

export const saveCoverProductImage = (fileName, contentAsABuffer) =>
  writeFile(join(publicFolderPath, fileName), contentAsABuffer)
