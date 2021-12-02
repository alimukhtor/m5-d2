import express from "express" 
import fs from 'fs'
import { fileURLToPath } from "url"
import { dirname, join } from "path"
import uniqid from "uniqid"
import createHttpError from "http-errors"
import { validationResult } from "express-validator"
import { authorValidation } from "./validation.js"
import { getAuthors, writeAuthors} from "../../library/fs-tools.js"
import { saveAuthorsAvatars } from "../../library/fs-tools.js"
import multer from 'multer'
const authorRouter = express.Router()


// const dataFolderPath = join(dirname(fileURLToPath(import.meta.url)), '../data') 
// console.log("Ali", dataFolderPath);

// console.log("Current Path is :", currentFilePath);

// const currentFolderPath = dirname(currentFilePath)
// console.log("Current folder is :", currentFolderPath);

// const authorJSONPath = join(currentFolderPath, "authors.json")


// Posting Here....

const uploader = multer({
    fileFilter: (request, file, next) => {
      if (file.mimetype !== "image/png") {
        next(createHttpError(400, "only pngs are allowed"))
      } else {
        next(null, true)
      }
    },
  }).single("avatarPic")
authorRouter.post("/:authorId/uploadAvatar", uploader, authorValidation, async(request, response, next)=> {

    try {
        console.log("File", request.file);
        response.send("ok")
        await saveAuthorsAvatars(request.file.originalname, request.file.buffer)
        const errorsList = validationResult(request)
        if(!errorsList.isEmpty()){
            next(createHttpError(400, "Some errors occured in  request body", {errorsList}))
        }else{

            console.log("Body", request.body);
            const newAuthor = {
                ...request.body, 
                id: uniqid(), 
                createdAt: new Date(), 
                updatedAt: new Date()
            }
            console.log(newAuthor);
        
            // const author = JSON.parse(fs.readFileSync(authorJSONPath))
            const author = await getAuthors()
        
            author.push(newAuthor)
            // fs.writeFileSync(authorJSONPath, JSON.stringify(author))
            await writeAuthors()
            response.status(201).send({id: newAuthor.id})
        }
        
    } catch (error) {
        next(error)
    }
   
})


// Getting Here ......



authorRouter.get("/", async(request, response, next)=> {
    try {
        // const readJsonFile = fs.readFileSync(authorJSONPath)
        // const authorArray = JSON.parse(readJsonFile)
        const author = await getAuthors()
        // console.log("FILE CONTENT: ", JSON.parse(readJsonFile))
        response.send(author)
        
    } catch (error) {
        next(error)
    }
})



// Getting Single Author........


authorRouter.get("/:authorId", async(request, response, next)=> {
    try {
        console.log("user id is : ", request.params.authorId)
        // const author = JSON.parse(fs.readFileSync(authorJSONPath))
        const author = await getAuthors()
        
    
        const findAuthorId = author.find(i => i.id === request.params.authorId)
        if(findAuthorId){
            response.send(findAuthorId)

        }else{
            next(createHttpError(404,  `Author with an id of ${request.params.authorId} not found`))
        }
        
    } catch (error) {
        next(error)
    }
})

// Update author here .............

authorRouter.put("/:authorId", async(request, response, next)=> {
    try {
        // const author = JSON.parse(fs.readFileSync(authorJSONPath))
        const author = await getAuthors()
        const filterId = author.findIndex(index => index.id === request.params.authorId)
        const updateAuthor = {...author[filterId], ...request.body}
        console.log("Updated user id is:", request.params.authorId);
    
        author[filterId] = updateAuthor
        // fs.writeFileSync(authorJSONPath, JSON.stringify(author))
        await writeAuthors()
        response.send(updateAuthor)
        
    } catch (error) {
        next(error)
    }
})


// Delete author here.....


authorRouter.delete("/:authorId", async(request, response, next)=> {
    try {
        // const author = JSON.parse(fs.readFileSync(authorJSONPath))
        const author = await getAuthors()
        const restOfUsers  = author.filter(users => users.id !== request.params.authorId)
        // fs.writeFileSync(authorJSONPath, JSON.stringify(restOfUsers))
        await writeAuthors(restOfUsers)
        console.log("Deleted user id is:", request.params.authorId);
        response.status(204).send()
        
    } catch (error) {
        next(error)
    }
})


export default authorRouter