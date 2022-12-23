import express from "express"
import listEndpoints from "express-list-endpoints"
import productsRouter from "./api/products/index.js"
import { badRequestHandler, unauthorizedHandler, notFoundHandler, genericErrorHandler } from "./errorHandlers.js"
import reviewsRouter from "./api/reviews/index.js"

const server = express()
const port = 3001

server.use(express.json())

// ---------------------ENDPOINTS-----------------------

server.use("/products", productsRouter)
server.use("/products", reviewsRouter)

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
