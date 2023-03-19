import { NextFunction, Request, Response } from "express"

import users from "@services/users.service"
import documentsService from "@services/documents.service"
import { UserRequest } from "@app-types/request.types"

async function upload(req: UserRequest, res: Response, next: NextFunction) {
  try {
    const userId = req.userId as string
    const file = req.file as Express.MulterS3.File

    if (!file) return res.status(400).json({ error: "No file provided" })

    const { name, description } = req.body

    res.json(
      await documentsService.upload({
        userId,
        name,
        description,
        file
      })
    )
  } catch (err) {
    console.log(err)
    next(err)
  }
}

async function addFile(req: UserRequest, res: Response, next: NextFunction) {
  try {
    const documentId = req.params.id
    const userId = req.userId as string
    const file = req.file as Express.MulterS3.File

    if (!file) return res.status(400).json({ error: "No file provided" })

    const { name, description } = req.body

    res.json(
      await documentsService.addFile(documentId, {
        userId,
        name,
        description,
        file
      })
    )
  } catch (err) {
    console.log(err)
    next(err)
  }
}

async function removeFile(req: UserRequest, res: Response, next: NextFunction) {
  try {
    const fileId = req.params.file
    res.json(await documentsService.removeFile(fileId))
  } catch (err) {
    console.log(err)
    next(err)
  }
}

async function removeDocument(req: UserRequest, res: Response, next: NextFunction) {
  try {
    const documentId = req.params.id
    res.json(await documentsService.removeDocument(documentId))
  } catch (err) {
    console.log(err)
    next(err)
  }
}

async function getAll(req: UserRequest, res: Response, next: NextFunction) {
  try {
    const userId = req.userId as string
    res.json(await documentsService.getByUserId(userId))
  } catch (err) {
    console.log(err)
    next(err)
  }
}

async function getAllByUserId(req: UserRequest, res: Response, next: NextFunction) {
  try {
    const userId = req.userId as string
    res.json(await documentsService.getByUserId(userId))
  } catch (err) {
    console.log(err)
    next(err)
  }
}

async function getById(req: UserRequest, res: Response, next: NextFunction) {
  try {
    res.json(await documentsService.getById(req.params.id))
  } catch (err) {
    console.log(err)
    next(err)
  }
}

export default { getAll, getById, upload, getAllByUserId, addFile, removeFile, removeDocument }
