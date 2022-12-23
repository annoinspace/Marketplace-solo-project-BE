import { fileURLToPath } from "url"
import { dirname, join } from "path"
import fs from "fs-extra"
const { readJSON, writeJSON } = fs

// adding the functions for red/write JSON and JSON/folder paths
const dataFolderPath = join(dirname(fileURLToPath(import.meta.url)), "../data")
const productsJSONPath = join(dataFolderPath, "products.json")

export const getProducts = () => readJSON(productsJSONPath)
export const writeProducts = (productsArray) => writeJSON(productsJSONPath, productsArray)
