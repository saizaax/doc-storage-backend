import express from "express"

import visionController from "@controllers/vision.controller"
import { authenticateToken } from "@middlewares/auth.middleware"

const router = express.Router()

router.get("/:id", authenticateToken, visionController.analyze)

export default router
