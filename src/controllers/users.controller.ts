import { NextFunction, Request, Response } from "express"

import users from "@services/users.service"

async function getAll(req: Request, res: Response, next: NextFunction) {
  try {
    res.json(await users.get())
  } catch (err) {
    console.log(err)
    next(err)
  }
}

async function getById(req: Request, res: Response, next: NextFunction) {
  try {
    res.json(await users.getById(req.params.id))
  } catch (err) {
    console.log(err)
    next(err)
  }
}

export default { getAll, getById }
