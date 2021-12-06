import express from "express"

import listEndpoints from "express-list-endpoints"

import authorRouter from "./services/blogs/index.js"

import cors from 'cors'

import { join } from "path"

import {badRequestHandler, unauthorizedHandler, notFoundHandler} from './handleErrors.js'

const server = express()

const port = process.env.PORT 


const whiteList = [process.env.FE_LOCAL_URL]

const corseOptions= {
    origin: function(origin, next){
        console.log("origin:", origin);
        if(!origin || whiteList.indexOf(origin) !== -1){
            next(null, true)
        }else{
            next(new Error("Smth went wrong in Cors"))
        }
    }
}
server.use(cors(corseOptions))
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