import express from "express" 
import fs from 'fs'
import { fileURLToPath } from "url"
import { dirname, join } from "path"
import uniqid from "uniqid"
import createHttpError from "http-errors"
import { validationResult } from "express-validator"
import { authorValidation } from "./validation.js"
const authorRouter = express.Router()


const currentFilePath = fileURLToPath(import.meta.url) 

console.log("Current Path is :", currentFilePath);

const currentFolderPath = dirname(currentFilePath)
console.log("Current folder is :", currentFolderPath);

const authorJSONPath = join(currentFolderPath, "authors.json")


// Posting Here....


authorRouter.post("/", authorValidation, (request, response, next)=> {

    try {
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
        
            const author = JSON.parse(fs.readFileSync(authorJSONPath))
        
            author.push(newAuthor)
            fs.writeFileSync(authorJSONPath, JSON.stringify(author))
            response.status(201).send({id: newAuthor.id})
        }
        
    } catch (error) {
        next(error)
    }
   
})


// Getting Here ......



authorRouter.get("/", (request, response, next)=> {
    try {
        const readJsonFile = fs.readFileSync(authorJSONPath)
        const authorArray = JSON.parse(readJsonFile)
        console.log("FILE CONTENT: ", JSON.parse(readJsonFile))
        response.send(authorArray)
        
    } catch (error) {
        next(error)
    }
})



// Getting Single Author........


authorRouter.get("/:authorId", (request, response, next)=> {
    try {
        console.log("user id is : ", request.params.authorId)
        const author = JSON.parse(fs.readFileSync(authorJSONPath))
        
    
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

authorRouter.put("/:authorId", (request, response, next)=> {
    try {
        const author = JSON.parse(fs.readFileSync(authorJSONPath))
        const filterId = author.findIndex(index => index.id === request.params.authorId)
        const updateAuthor = {...author[filterId], ...request.body}
        console.log("Updated user id is:", request.params.authorId);
    
        author[filterId] = updateAuthor
        fs.writeFileSync(authorJSONPath, JSON.stringify(author))
        response.send(updateAuthor)
        
    } catch (error) {
        next(error)
    }
})


// Delete author here.....


authorRouter.delete("/:authorId", (request, response, next)=> {
    try {
        const author = JSON.parse(fs.readFileSync(authorJSONPath))
        const restOfUsers  = author.filter(users => users.id !== request.params.authorId)
        fs.writeFileSync(authorJSONPath, JSON.stringify(restOfUsers))
        console.log("Deleted user id is:", request.params.authorId);
        response.status(204).send()
        
    } catch (error) {
        next(error)
    }
})


export default authorRouter