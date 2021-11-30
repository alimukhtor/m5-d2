import express from "express" 
import fs from 'fs'
import { fileURLToPath } from "url"
import { dirname, join } from "path"
import uniqid from "uniqid"

const authorRouter = express.Router()


const currentFilePath = fileURLToPath(import.meta.url) 

console.log("Current Path is :", currentFilePath);

const currentFolderPath = dirname(currentFilePath)
console.log("Current folder is :", currentFolderPath);

const authorJSONPath = join(currentFolderPath, "authors.json")


// Posting Here....


authorRouter.post("/", (request, response)=> {
    console.log("Body", request.body);
   
    const newAuthor = {...request.body, id: uniqid()}
    console.log(newAuthor);

    const author = JSON.parse(fs.readFileSync(authorJSONPath))

    author.push(newAuthor)
    fs.writeFileSync(authorJSONPath, JSON.stringify(author))
    response.status(201).send({id: newAuthor.id})
})


// Getting Here ......



authorRouter.get("/", (request, response)=> {
    const readJsonFile = fs.readFileSync(authorJSONPath)
    const authorArray = JSON.parse(readJsonFile)
    console.log("FILE CONTENT: ", JSON.parse(readJsonFile))
    response.send(authorArray)
})




authorRouter.get("/:authorId", (request, response)=> {
    console.log("user id is : ", request.params.authorId)
    const author = JSON.parse(fs.readFileSync(authorJSONPath))


    const findAuthorId = author.find(i => i.id === request.params.authorId)
    response.send(findAuthorId)
})



authorRouter.put("/:authorId", (request, response)=> {
    const author = JSON.parse(fs.readFileSync(authorJSONPath))
    const filterId = author.findIndex(index => index.id === request.params.authorId)
    const updateAuthor = {...author[filterId], ...request.body}

    author[filterId] = updateAuthor
    fs.writeFileSync(authorJSONPath, JSON.stringify(author))
    response.send(updateAuthor)
})



authorRouter.delete("/:authorId", (request, response)=> {
    const author = JSON.parse(fs.readFileSync(authorJSONPath))
})


export default authorRouter