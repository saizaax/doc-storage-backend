import express from "express"

import documentsController from "@controllers/documents.controller"
import { authenticateToken } from "@middlewares/auth.middleware"
import { multerS3Upload } from "@middlewares/multer.middleware"

const router = express.Router()

router.post("/upload", authenticateToken, multerS3Upload, documentsController.upload)
router.post("/upload/:id", authenticateToken, multerS3Upload, documentsController.addFile)
router.delete("/remove/:file", authenticateToken, documentsController.removeFile)
router.get("/", authenticateToken, documentsController.getAllByUserId)
router.get("/:id", authenticateToken, documentsController.getById)
router.delete("/:id", authenticateToken, documentsController.removeDocument)

export default router
