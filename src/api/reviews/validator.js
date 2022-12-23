// reviews structure
// {
//     "_id": "123455", //SERVER GENERATED
//     "comment": "A good book but definitely I don't like many parts of the plot", //REQUIRED
//     "rate": 3, //REQUIRED, max 5
//     "productId": "5d318e1a8541744830bef139", //REQUIRED
//     "createdAt": "2019-08-01T12:46:45.895Z" // SERVER GENERATED
// }

const commentSchema = {
  comment: {
    in: ["body"],
    isString: {
      errorMessage: "please include the product name"
    }
  },
  rate: {
    in: ["body"],
    isNumeric: {
      errorMessage: "please include the rating out of 5"
    }
  }
}

export const checkCommentSchema = checkSchema(commentSchema)

export const triggerCommentBadRequest = (req, res, next) => {
  const errors = validationResult(req)
  console.log(errors.array())

  if (!errors.isEmpty()) {
    next(
      createHttpError(
        400,
        "Error during product validation, please check you have entered data correctly",
        {
          errorsList: errors.array()
        }
      )
    )
  } else {
    next()
  }
}
