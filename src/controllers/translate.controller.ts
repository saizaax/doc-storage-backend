import { NextFunction, Request, Response } from "express"

import translateService from "@services/translate.service"
import { UserRequest } from "@app-types/request.types"

async function translate(req: UserRequest, res: Response, next: NextFunction) {
  try {
    const { textId, language } = req.body

    res.json(await translateService.translate(textId, language))
  } catch (err) {
    console.log(err)
    next(err)
  }
}

export default { translate }
