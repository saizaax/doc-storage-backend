import { NextFunction, Request, Response } from "express"

import users from "@services/users.service"
import filesService from "@services/files.service"
import { UserRequest } from "@app-types/request.types"

async function getById(req: UserRequest, res: Response, next: NextFunction) {
  try {
    res.json(await filesService.getById(req.params.id))
  } catch (err) {
    console.log(err)
    next(err)
  }
}

async function getByUserId(req: UserRequest, res: Response, next: NextFunction) {
  try {
    res.json(await filesService.getByUserId(req.userId as string))
  } catch (err) {
    console.log(err)
    next(err)
  }
}

export default { getById, getByUserId }
