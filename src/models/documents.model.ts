import { AuthRequest } from "@app-types/auth.types"
import { UploadDocumentRequest } from "@app-types/document.types"
import { prisma } from "src/index"

async function add(data: UploadDocumentRequest) {
  const document = await prisma.document.create({
    data: {
      userId: data.userId,
      name: data.name,
      description: data.description,
      size: 0,
      created_at: new Date(),
      updated_at: new Date()
    }
  })

  await prisma.file.create({
    data: {
      name: data.file.filename,
      format: data.file.mimetype,
      size: data.file.size,
      url: data.file.path,
      created_at: new Date(),
      updated_at: new Date(),
      documentId: document.id
    }
  })

  return await prisma.document.findUnique({
    where: {
      id: document.id
    },
    include: {
      File: true
    }
  })
}

async function getAll() {
  return await prisma.document.findMany()
}

async function getById(id: string) {
  return await prisma.document.findUnique({
    where: {
      id: id
    },
    include: {
      File: true
    }
  })
}

export default { add, getAll, getById }
