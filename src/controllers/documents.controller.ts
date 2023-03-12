import { NextFunction, Request, Response } from "express"

import users from "@services/users.service"
import documents from "@services/documents.service"
import { UserRequest } from "@app-types/request.types"

async function upload(req: UserRequest, res: Response, next: NextFunction) {
  try {
    const userId = req.userId as string
    const file = req.file

    if (!file) return res.json({ error: "No file provided" })

    const { name, description } = req.body

    res.json(
      await documents.upload({
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

async function getAll(req: UserRequest, res: Response, next: NextFunction) {
  try {
    res.json(await documents.get())
  } catch (err) {
    console.log(err)
    next(err)
  }
}

async function getById(req: UserRequest, res: Response, next: NextFunction) {
  try {
    res.json(await documents.getById(req.params.id))
  } catch (err) {
    console.log(err)
    next(err)
  }
}

export default { getAll, getById, upload }
