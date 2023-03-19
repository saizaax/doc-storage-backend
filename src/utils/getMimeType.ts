export const getMimeType = (extension: string) => {
  switch (extension) {
    case "png":
      return "image/png"
    case "jpg":
      return "image/jpeg"
    case "jpeg":
      return "image/jpeg"
    case "pdf":
      return "application/pdf"
    case "docx":
      return "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    case "doc":
      return "application/msword"
    case "md":
      return "text/markdown"
    default:
      return null
  }
}

export const getExtension = (mimeType: string) => {
  switch (mimeType) {
    case "image/png":
      return "png"
    case "image/jpeg":
      return "jpg"
    case "application/pdf":
      return "pdf"
    case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
      return "docx"
    case "application/msword":
      return "doc"
    case "text/markdown":
      return "md"
    default:
      return null
  }
}
