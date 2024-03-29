import { NextFunction, Request, Response } from "express"

import usersService from "@services/users.service"
import { UserRequest } from "@app-types/request.types"

async function getAll(req: UserRequest, res: Response, next: NextFunction) {
  try {
    res.json(await usersService.get())
  } catch (err) {
    console.log(err)
    next(err)
  }
}

async function getById(req: UserRequest, res: Response, next: NextFunction) {
  try {
    res.json(await usersService.getById(req.params.id))
  } catch (err) {
    console.log(err)
    next(err)
  }
}

async function getByToken(req: UserRequest, res: Response, next: NextFunction) {
  try {
    const userId = req.userId as string
    res.json(await usersService.getById(userId))
  } catch (err) {
    console.log(err)
    next(err)
  }
}

export default { getAll, getById, getByToken }
