
import { body } from "express-validator"

export const authorValidation = [
  body("category").exists().withMessage("Category is a mandatory field!"),
  body("title").exists().withMessage("Title is a mandatory field!"),
  body("cover").exists().withMessage("Cover is a mandatory field!"),
  body("name").exists().withMessage("Name is a mandatory field!"),
  body("avatar").exists().withMessage("Avatar is a mandatory field!"),
  body("readTime.value").exists().withMessage("ReadTime value is a mandatory field!"),
  body("readTime.unit").exists().withMessage("ReadTime unit is a mandatory field!"),
  body("author.name").exists().withMessage("Author name is a mandatory field!"),
  body("author.avatar").exists().withMessage("Author avatar is a mandatory field!"),
]