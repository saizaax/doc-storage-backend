import { prisma } from "src/index"

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

export default { getAll, getById }