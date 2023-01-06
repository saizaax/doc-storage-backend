import express from "express"
import cors from "cors"

import { PrismaClient } from "@prisma/client"

import dotenv from "dotenv"

/** Environment **/
dotenv.config()

/** Initialization **/
export const prisma = new PrismaClient()
const app = express()

app.use(cors())
app.use(express.json())

const port = Number(process.env.PORT) || 3000

app.listen(port, () => {
  console.log(`⚡️ [server]: Server is running at port: ${port}`)
})