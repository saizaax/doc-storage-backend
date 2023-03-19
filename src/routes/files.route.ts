import express from "express"

import filesController from "@controllers/files.controller"
import { authenticateToken } from "@middlewares/auth.middleware"

const router = express.Router()

router.get("/:id", authenticateToken, filesController.getById)

export default router
