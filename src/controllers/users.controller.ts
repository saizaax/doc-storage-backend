import { NextFunction, Request, Response } from "express"

import users from "@services/users.service"
import { UserRequest } from "@app-types/request.type"

async function getAll(req: UserRequest, res: Response, next: NextFunction) {
  try {
    res.json(await users.get())
  } catch (err) {
    console.log(err)
    next(err)
  }
}

async function getById(req: UserRequest, res: Response, next: NextFunction) {
  try {
    res.json(await users.getById(req.params.id))
  } catch (err) {
    console.log(err)
    next(err)
  }
}

export default { getAll, getById }
