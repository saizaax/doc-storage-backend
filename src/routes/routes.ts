import express from "express"

import usersRoute from "@routes/users.route"

export const rootRouter = express.Router()

rootRouter.use("/users", usersRoute)