import express from "express"

import usersController from "@controllers/users.controller"

const router = express.Router()

router.get("/", usersController.getAll)
router.get("/:id", usersController.getById)

export default router