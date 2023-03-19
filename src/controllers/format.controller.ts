import { NextFunction, Request, Response } from "express"

import formatService from "@services/format.service"
import { UserRequest } from "@app-types/request.types"

async function formatFile(req: UserRequest, res: Response, next: NextFunction) {
  try {
    const { format, fileId } = req.body

    res.json(
      await formatService.formatFile({
        format,
        fileId
      })
    )
  } catch (err) {
    console.log(err)
    next(err)
  }
}

export default { formatFile }
