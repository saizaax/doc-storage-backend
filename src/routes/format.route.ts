import express from "express"

import formatController from "@controllers/format.controller"
import { authenticateToken } from "@middlewares/auth.middleware"

const router = express.Router()

router.post("/", authenticateToken, formatController.formatFile)

export default router
