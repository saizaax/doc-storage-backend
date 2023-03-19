import { NextFunction, Request, Response } from "express"

import visionService from "@services/vision.service"
import { UserRequest } from "@app-types/request.types"

async function analyze(req: UserRequest, res: Response, next: NextFunction) {
  try {
    const { id } = req.params
    res.json(await visionService.analyze(id))
  } catch (err) {
    console.log(err)
    next(err)
  }
}

export default { analyze }
