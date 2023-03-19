import express from "express"

import usersRoute from "@routes/users.route"
import authRoute from "@routes/auth.route"
import documentsRoute from "@routes/documents.route"
import formatRoute from "@routes/format.route"
import filesRoute from "@routes/files.route"
import visionRoute from "@routes/vision.route"
import translateRoute from "@routes/translate.route"

export const rootRouter = express.Router()

rootRouter.use("/convert", formatRoute)
rootRouter.use("/users", usersRoute)
rootRouter.use("/auth", authRoute)
rootRouter.use("/documents", documentsRoute)
rootRouter.use("/files", filesRoute)
rootRouter.use("/vision", visionRoute)
rootRouter.use("/translate", translateRoute)
