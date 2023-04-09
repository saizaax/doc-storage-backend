import express from "express"

import authController from "@controllers/auth.controller"
import { authenticateToken } from "@middlewares/auth.middleware"

const router = express.Router()

router.post("/register", authController.register)
router.post("/login", authController.login)
router.post("/refresh", authController.refresh)
router.get("/validate", authenticateToken, authController.validate)

export default router
