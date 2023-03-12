import { UploadDocumentRequest } from "@app-types/document.types"
import documentsModel from "@models/documents.model"

async function upload(data: UploadDocumentRequest) {
  console.log(data.file)

  return await documentsModel.add({
    ...data,
    name: data.name ? data.name : data.file.originalname
  })
}

async function get() {
  return await documentsModel.getAll()
}

async function getById(id: string) {
  return await documentsModel.getById(id)
}

export default { get, getById, upload }
