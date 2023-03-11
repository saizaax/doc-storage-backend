import { NextFunction, Request, Response } from "express"

import auth from "@services/auth.service"

async function register(req: Request, res: Response, next: NextFunction) {
  try {
    res.json(await auth.register(req.body))
  } catch (err) {
    console.log(err)
    next(err)
  }
}

async function login(req: Request, res: Response, next: NextFunction) {
  try {
    res.json(await auth.login(req.body))
  } catch (err) {
    console.log(err)
    next(err)
  }
}

async function refresh(req: Request, res: Response, next: NextFunction) {
  try {
    res.json(await auth.refresh(req.body))
  } catch (err) {
    console.log(err)
    next(err)
  }
}

export default { register, login, refresh }
