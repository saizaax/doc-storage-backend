import { AuthRequest, RefreshRequest } from "@app-types/auth.types"
import authModel from "@models/auth.model"
import usersModel from "@models/users.model"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

async function register(data: AuthRequest) {
  const { email, password } = data

  const hashedPassword = await bcrypt.hash(password, 10)

  return await authModel.register({
    email,
    password: hashedPassword
  })
}

async function login(data: AuthRequest) {
  const { email, password } = data

  const user = await usersModel.getByEmail(email)
  if (!user) return { error: "Invalid credentials" }

  const passwordMatch = await bcrypt.compare(password, user.password)
  if (!passwordMatch) ({ error: "Invalid credentials" })

  const accessToken = jwt.sign(
    { userId: user.id },
    process.env.ACCESS_TOKEN_SECRET as string,
    { expiresIn: "60m" }
  )
  const refreshToken = jwt.sign(
    { userId: user.id },
    process.env.REFRESH_TOKEN_SECRET as string
  )

  return { accessToken, refreshToken }
}

async function refresh(data: RefreshRequest) {
  const { refreshToken } = data

  if (!refreshToken) return { error: "No refresh token provided" }

  try {
    const userId = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET as string
    )

    const accessToken = jwt.sign(
      { userId: userId },
      process.env.ACCESS_TOKEN_SECRET as string,
      { expiresIn: "60m" }
    )

    return { accessToken }
  } catch (err) {
    return { error: "Invalid refresh token" }
  }
}

export default { login, register, refresh }
