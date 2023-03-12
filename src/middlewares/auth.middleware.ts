import jwt, { JwtPayload } from "jsonwebtoken"
import { Response } from "express"
import { UserRequest } from "@app-types/request.types"

export const authenticateToken = (
  req: UserRequest,
  res: Response,
  next: () => void
) => {
  const authHeader = req.headers["authorization"]
  const token = authHeader && authHeader.split(" ")[1]

  if (!token) return res.status(401).json({ error: "Unauthorized" })

  jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET as string,
    (err, data: any) => {
      if (err) return res.status(403).json({ error: "Unauthorized" })
      if (data) req.userId = data.userId

      next()
    }
  )
}
