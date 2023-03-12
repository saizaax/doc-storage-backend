import express from "express"

import usersController from "@controllers/users.controller"
import documentsController from "@controllers/documents.controller"
import { authenticateToken } from "@middlewares/auth.middleware"
import { multerUpload } from "@middlewares/multer.middleware"

const router = express.Router()

router.post(
  "/upload",
  authenticateToken,
  multerUpload,
  documentsController.upload
)
router.get("/", authenticateToken, documentsController.getAll)
router.get("/:id", authenticateToken, documentsController.getById)

export default router
