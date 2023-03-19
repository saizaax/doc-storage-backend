export type UploadDocumentRequest = {
  name: string
  description: string
  userId: string
  file: Express.MulterS3.File
}
