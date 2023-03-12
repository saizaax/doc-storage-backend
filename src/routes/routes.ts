import express from "express"

import usersRoute from "@routes/users.route"
import authRoute from "@routes/auth.route"
import documentsRoute from "@routes/documents.route"

export const rootRouter = express.Router()

rootRouter.use("/users", usersRoute)
rootRouter.use("/auth", authRoute)
rootRouter.use("/documents", documentsRoute)
