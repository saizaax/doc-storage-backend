import { AuthRequest } from "@app-types/auth.type"
import { prisma } from "src/index"

async function register(data: AuthRequest) {
  return await prisma.user.create({
    data: {
      username: data.email,
      email: data.email,
      password: data.password,
      created_at: new Date(),
      avatar: "https://i.imgur.com/B9egDaT.png"
    }
  })
}

async function login(data: AuthRequest) {}

export default { register }
