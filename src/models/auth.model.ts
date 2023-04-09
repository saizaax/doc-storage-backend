import { AuthRequest } from "@app-types/auth.types"
import { generateUsername } from "unique-username-generator"
import { prisma } from "src/index"

async function register(data: AuthRequest) {
  const randomUsername = generateUsername("-", 0, 18)

  return await prisma.user.create({
    data: {
      username: randomUsername,
      email: data.email,
      password: data.password,
      created_at: new Date(),
      avatar: "https://i.imgur.com/B9egDaT.png"
    }
  })
}

export default { register }
