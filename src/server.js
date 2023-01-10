import express from "express"
import listEndpoints from "express-list-endpoints"
import cors from "cors"
import { join } from "path"
import createHttpError from "http-errors"
import productsRouter from "./api/products/index.js"
import { badRequestHandler, unauthorizedHandler, notFoundHandler, genericErrorHandler } from "./errorHandlers.js"
import reviewsRouter from "./api/reviews/index.js"
import filesRouter from "./api/files/index.js"

const server = express()
const port = process.env.PORT

const publicFolderPath = join(process.cwd(), "./public")
console.log("Public folder path in server-----------", publicFolderPath)

// ---------------- WHITELIST FOR CORS -----------------

const whitelist = [process.env.FE_DEV_URL, process.env.FE_PROD_URL]

const corsOptions = {
  origin: (origin, corsNext) => {
    console.log("-----CURRENT ORIGIN -----", origin)
    if (!origin || whitelist.indexOf(origin) !== -1) {
      corsNext(null, true)
    } else {
      corsNext(createHttpError(400, `Origin ${origin} is not in the whitelist!`))
    }
  }
}

server.use(express.static(publicFolderPath))
server.use(express.json())
server.use(cors(corsOptions))
// ---------------------ENDPOINTS-----------------------

server.use("/products", productsRouter)
server.use("/products", reviewsRouter)
server.use("/products", filesRouter)

// ---------------------ERROR HANDLERS-----------------------
server.use(badRequestHandler) // 400
server.use(unauthorizedHandler) // 401
server.use(notFoundHandler) // 404
server.use(genericErrorHandler) // 500
// ---------------------SERVER HANDLERS-----------------------

server.listen(port, () => {
  console.table(listEndpoints(server))
  console.log("server is running on port:", port)
})
