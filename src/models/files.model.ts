import { UploadDocumentRequest } from "@app-types/document.types"
import { FileUploadRequest } from "@app-types/files.types"
import { prisma } from "src/index"

async function getById(id: string) {
  return await prisma.file.findUnique({
    where: {
      id: id
    },
    include: {
      Format: true,
      Text: true,
      Translation: true
    }
  })
}

async function addFile(documentId: string, data: FileUploadRequest) {
  return await prisma.file.create({
    data: {
      name: data.name,
      format: data.format,
      size: data.size,
      url: data.url,
      created_at: new Date(),
      updated_at: new Date(),
      documentId: documentId
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

export default { addFile, removeFile, getById }
