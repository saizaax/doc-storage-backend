import express from "express"

import translateController from "@controllers/translate.controller"
import { authenticateToken } from "@middlewares/auth.middleware"

const router = express.Router()

router.post("/", authenticateToken, translateController.translate)

export default router
