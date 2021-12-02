import express from "express"

import listEndpoints from "express-list-endpoints"

import authorRouter from "./services/blogs/index.js"

import cors from 'cors'

import { join } from "path"

import {badRequestHandler, unauthorizedHandler, notFoundHandler} from './handleErrors.js'

const server = express()

const port = 3004       

server.use(cors())
server.use(express.json())


// Endponts here


server.use("/author", authorRouter)
console.table(listEndpoints(server))

// Endpoints here


// Errors are here
const publicFolderPath = join(process.cwd(), "./public")
server.use(express.static(publicFolderPath))
server.use(badRequestHandler)
server.use(unauthorizedHandler)
server.use(notFoundHandler)

// Errors here

server.listen(port, ()=> {
    console.log(`Server is running on port ${port}`);
})