// route handlers for the product reviews
import express from "express"
import httpErrors from "http-errors"
import uniqid from "uniqid"
import { writeReviews, getReviews } from "../../lib/fs-tools.js"

const reviewsRouter = express.Router()

reviewsRouter.post("/:productId/reviews", async (req, res, next) => {
  try {
    const newReview = {
      _id: uniqid(),
      ...req.body,
      productId: req.params.productId,
      createdAt: new Date()
    }

    const reviewsArray = await getReviews()
    reviewsArray.push(newReview)
    writeReviews(reviewsArray)
    res.status(201).send({ _id: newReview._id, productId: newReview.productId })
  } catch (error) {
    console.log("----error adding new commment-----")
    next(error)
  }
})

reviewsRouter.get("/:productId/reviews", async (req, res, next) => {
  try {
    const reviewsArray = await getReviews()
    res.status(200).send(reviewsArray)
  } catch (error) {
    console.log("----error loading reviews-----")
    next(error)
  }
})

export default reviewsRouter
