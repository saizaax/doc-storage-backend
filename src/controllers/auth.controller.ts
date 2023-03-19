import { NextFunction, Request, Response } from "express"

import authService from "@services/auth.service"

async function register(req: Request, res: Response, next: NextFunction) {
  try {
    res.json(await authService.register(req.body))
  } catch (err) {
    console.log(err)
    next(err)
  }
}

async function login(req: Request, res: Response, next: NextFunction) {
  try {
    res.json(await authService.login(req.body))
  } catch (err) {
    console.log(err)
    next(err)
  }
}

async function refresh(req: Request, res: Response, next: NextFunction) {
  try {
    res.json(await authService.refresh(req.body))
  } catch (err) {
    console.log(err)
    next(err)
  }
}

export default { register, login, refresh }
