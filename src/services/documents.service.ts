import { UploadDocumentRequest } from "@app-types/document.types"
import documentsModel from "@models/documents.model"

async function upload(data: UploadDocumentRequest) {
  return await documentsModel.add({
    ...data,
    name: data.name ? data.name : data.file.originalname
  })
}

async function addFile(id: string, data: UploadDocumentRequest) {
  return await documentsModel.addFile(id, data)
}

async function removeFile(fileId: string) {
  return await documentsModel.removeFile(fileId)
}

async function removeDocument(documentId: string) {
  return await documentsModel.removeDocument(documentId)
}

async function get() {
  return await documentsModel.getAll()
}

async function getByUserId(id: string) {
  return await documentsModel.getByUserId(id)
}

async function getById(id: string) {
  const document = await documentsModel.getById(id)

  if (!document) return { error: "Document not found" }

  return document
}

export default { get, getById, upload, getByUserId, addFile, removeFile, removeDocument }
