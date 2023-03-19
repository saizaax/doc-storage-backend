import { FileUploadRequest } from "@app-types/files.types"
import { prisma } from "src/index"

async function getById(id: string) {
  return await prisma.text.findUnique({
    where: {
      id: id
    }
  })
}

async function addText(fileId: string, content: string) {
  return await prisma.text.create({
    data: {
      content: content,
      created_at: new Date(),
      updated_at: new Date(),
      fileId: fileId
    }
  })
}

async function removeText(id: string) {
  return await prisma.text.delete({
    where: {
      id: id
    }
  })
}

export default { addText, removeText, getById }
