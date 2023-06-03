import { prisma } from "@/index"

async function getAll() {
  return await prisma.user.findMany()
}

async function getById(id: string) {
  return await prisma.user.findUnique({
    where: {
      id: id
    }
  })
}

async function getByEmail(email: string) {
  return await prisma.user.findUnique({
    where: {
      email: email
    }
  })
}

export default { getAll, getById, getByEmail }
