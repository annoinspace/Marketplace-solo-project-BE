// route handlers for the product reviews
import express from "express"
import httpErrors from "http-errors"
import uniqid from "uniqid"
import { writeReviews, getReviews } from "../../lib/fs-tools.js"
const { NotFound, BadRequest } = httpErrors
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
    next(BadRequest(`Unfortunately this review was not created!`))
  }
})

// get all reviews
reviewsRouter.get("/:productId/reviews", async (req, res, next) => {
  try {
    const reviewsArray = await getReviews()
    res.status(200).send(reviewsArray)
  } catch (error) {
    console.log("----error loading reviews-----")
    next(error)
  }
})

// get single review
reviewsRouter.get("/:productId/reviews/:reviewId", async (req, res, next) => {
  try {
    const reviewsArray = await getReviews()
    const review = reviewsArray.filter((review) => review._id === req.params.reviewId)
    if (review) {
      res.status(200).send(review)
    } else {
      next(NotFound(`Unfortunately the product review with id:${req.params.productId} was not found!`))
    }
  } catch (error) {
    console.log("----error loading this review-----")
    next(error)
  }
})
// edit single review
reviewsRouter.put("/:productId/reviews/:reviewId", async (req, res, next) => {
  try {
    const reviewsArray = await getReviews()
    const index = reviewsArray.findIndex((review) => review._id === req.params.reviewId)
    const oldReviewInfo = reviewsArray[index]
    const updatedReviewInfo = { ...oldReviewInfo, ...req.body, updatedAt: new Date() }
    reviewsArray[index] = updatedReviewInfo
    await writeReviews(reviewsArray)
    res.send(updatedReviewInfo)
  } catch (error) {
    console.log("----error editing this review-----")
    next(error)
  }
})

// delete single review
reviewsRouter.delete("/:productId/reviews/:reviewId", async (req, res, next) => {
  try {
    const reviewsArray = await getReviews()
    const remainingReviews = reviewsArray.filter((review) => review._id !== req.params.reviewId)
    if (reviewsArray.length !== remainingReviews.length) {
      await writeReviews(remainingReviews)
      res.status(204).send()
    } else {
      next(BadRequest(`Review with id ${req.params.reviewId} not deleted!`))
    }
  } catch (error) {
    console.log("----error editing this review-----")
    next(error)
  }
})

export default reviewsRouter
