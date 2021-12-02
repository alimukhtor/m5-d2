import fs from "fs-extra"
import { fileURLToPath } from "url"
import { dirname, join } from "path"
const { readJSON, writeJSON, writeFile } = fs

const dataFolderPath = join(dirname(fileURLToPath(import.meta.url)), '../data') 
console.log("Ali", dataFolderPath);

const authorsJsonPath = join(dataFolderPath, "authors.json")
export const getAuthors = () => readJSON(authorsJsonPath)
export const writeAuthors = content => writeJSON(authorsJsonPath, content)