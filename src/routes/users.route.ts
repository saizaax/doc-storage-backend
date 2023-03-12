import express from "express"

import usersController from "@controllers/users.controller"
import { authenticateToken } from "@middlewares/auth.middleware"

const router = express.Router()

router.get("/", authenticateToken, usersController.getAll)
router.get("/me", authenticateToken, usersController.getByToken)
router.get("/:id", authenticateToken, usersController.getById)

export default router
