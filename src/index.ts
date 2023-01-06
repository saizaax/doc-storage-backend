import express from "express"
import cors from "cors"

import { PrismaClient } from "@prisma/client"

import dotenv from "dotenv"

import { rootRouter } from "@routes/routes"
import { errorHandler, notFoundHandler } from "@middlewares/error.middleware"

/** Environment **/
dotenv.config()

/** Initialization **/
export const prisma = new PrismaClient()
const app = express()

app.use(cors())
app.use(express.json())

app.use("/api", rootRouter)

/** Middlewares **/
app.use(errorHandler)
app.use("*", notFoundHandler)

const port = Number(process.env.PORT) || 3000

app.listen(port, () => {
  console.log(`⚡️ [server]: Server is running at port: ${port}`)
})