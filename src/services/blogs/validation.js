
import { body } from "express-validator"

export const authorValidation = [
  body("category").exists().withMessage("Category is a mandatory field!"), // frontend
  body("title").exists().withMessage("Title is a mandatory field!"), // frontend
  body("cover").exists().withMessage("Cover is a mandatory field!"), // frontend add
  // body("readTime.value").exists().withMessage("ReadTime value is a mandatory field!"), // calc at backend or send it from frontend
  // body("readTime.unit").exists().isLength({min:1}).withMessage("ReadTime unit is a mandatory field!"),
  // body("author.name").exists().isLength({min:1}).withMessage("Author name is a mandatory field!"),
  // body("author.avatar").exists().isLength({min:1}).withMessage("Author avatar is a mandatory field!"),
  body("text").exists().isLength({min:1}).withMessage("Content filed is a mandatory field!"),
]

/**
 * 
 * 
 *   count all the words in content and multiply by average word read time 
 */
