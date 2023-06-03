import { FileUploadRequest } from "@app-types/files.types"
import { prisma } from "@/index"

async function getById(id: string) {
  return await prisma.format.findUnique({
    where: {
      id: id
    }
  })
}

async function addFormat(fileId: string, data: FileUploadRequest) {
  return await prisma.format.create({
    data: {
      name: data.name,
      format: data.format,
      size: data.size,
      url: data.url,
      created_at: new Date(),
      updated_at: new Date(),
      fileId: fileId
    }
  })
}

async function removeFile(fileId: string) {
  return await prisma.format.delete({
    where: {
      id: fileId
    }
  })
}

export default { addFormat, removeFile, getById }
