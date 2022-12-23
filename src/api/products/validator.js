// structure of product
import { checkSchema, validationResult } from "express-validator"
import createHttpError from "http-errors"
// {
//     "_id": "5d318e1a8541744830bef139", //SERVER GENERATED
//     "name": "3310",  //REQUIRED
//     "description": "somthing longer", //REQUIRED
//     "brand": "nokia", //REQUIRED
//     "imageUrl":"https://drop.ndtv.com/TECH/product_database/images/2152017124957PM_635_nokia_3310.jpeg?downsize=*:420&output-quality=80",
//     "price": 100, //REQUIRED
//     "category": "smartphones" //REQUIRED
//     "createdAt": "2019-07-19T09:32:10.535Z", //SERVER GENERATED
//     "updatedAt": "2019-07-19T09:32:10.535Z", //SERVER GENERATED
// }

const productSchema = {
  name: {
    in: ["body"],
    isString: {
      errorMessage: "please include the product name"
    }
  },
  description: {
    in: ["body"],
    isString: {
      errorMessage: "please include the product description"
    }
  },
  brand: {
    in: ["body"],
    isString: {
      errorMessage: "please include the product brand"
    }
  },
  price: {
    in: ["body"],
    errorMessage: "price must be between 1 and 100,000",
    isLength: { options: { min: 1, max: 1000000 } }
  }
}

export const checkProductSchema = checkSchema(productSchema)

export const triggerProductBadRequest = (req, res, next) => {
  const errors = validationResult(req)
  console.log(errors.array())

  if (!errors.isEmpty()) {
    next(
      createHttpError(400, "Error during product validation, please check you have entered data correctly", {
        errorsList: errors.array()
      })
    )
  } else {
    next()
  }
}
