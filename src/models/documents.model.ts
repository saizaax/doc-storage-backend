import { UploadDocumentRequest } from "@app-types/document.types"
import filesModel from "@models/files.model"
import { prisma } from "src/index"

async function add(data: UploadDocumentRequest) {
  const document = await prisma.document.create({
    data: {
      userId: data.userId,
      name: data.name,
      description: data.description,
      size: data.file.size,
      created_at: new Date(),
      updated_at: new Date()
    }
  })

  await filesModel.addFile(document.id, {
    name: data.file.originalname,
    format: data.file.mimetype,
    size: data.file.size,
    url: data.file.location
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

async function addFile(id: string, data: UploadDocumentRequest) {
  await prisma.file.create({
    data: {
      name: data.file.originalname,
      format: data.file.mimetype,
      size: data.file.size,
      url: data.file.location,
      created_at: new Date(),
      updated_at: new Date(),
      documentId: id
    }
  })

  return await prisma.document.update({
    where: {
      id: id
    },
    data: {
      size: {
        increment: data.file.size
      },
      updated_at: new Date()
    },
    include: {
      File: true
    }
  })
}

async function removeFile(fileId: string) {
  return await prisma.file.delete({
    where: {
      id: fileId
    }
  })
}

async function removeDocument(documentId: string) {
  await prisma.file.deleteMany({
    where: {
      documentId: documentId
    }
  })

  return await prisma.document.delete({
    where: {
      id: documentId
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

async function getByUserId(id: string) {
  return await prisma.document.findMany({
    where: {
      userId: id
    },
    include: {
      File: true
    }
  })
}

export default { add, getAll, getById, getByUserId, addFile, removeFile, removeDocument }
