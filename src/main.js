import express from "express"

import listEndpoints from "express-list-endpoints"

import authorRouter from "./services/blogs/index.js"

const server = express()

const port = 3004

server.use(express.json())


// Endponts here


server.use("/author", authorRouter)
console.log(listEndpoints(server))



server.listen(port, ()=> {
    console.log(`Server is running on port ${port}`);
})