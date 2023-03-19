import { FormatFileRequest } from "@app-types/format.types"
import { PutObjectCommand } from "@aws-sdk/client-s3"
import { s3 } from "@middlewares/multer.middleware"
import { getExtension, getMimeType } from "@utils/getMimeType"
import pdf2img from "pdf-img-convert"
import filesModel from "@models/files.model"
import formatModel from "@models/format.model"

async function formatFile(data: FormatFileRequest) {
  const { fileId, format } = data

  const file = await filesModel.getById(fileId)

  if (!file) return { error: "File not found" }

  const path = process.env.S3_BUCKET_FOLDER as string

  if (format === "jpg" || format === "jpeg" || format === "png") {
    const fileName = file.name.replace(`.${getExtension(file.format)}`, `.${format}`)

    if (file.format === getMimeType("pdf")) {
      const [image] = (await pdf2img.convert(file.url, {
        page_numbers: [1],
        base64: true
      })) as unknown as string

      const imageBuffer = Buffer.from(image, "base64")
      const key = `${path}/${Date.now()}-${fileName}`

      const command = new PutObjectCommand({
        Bucket: process.env.S3_BUCKET,
        Key: key,
        Body: imageBuffer
      })

      const uploaded = await s3.send(command)

      if (uploaded.$metadata.httpStatusCode !== 200) return { error: "File convert error" }

      const metadata = {
        name: key.split("/").pop() as string,
        size: imageBuffer.length,
        format: getMimeType(format) as string,
        url: `${process.env.S3_ENDPOINT}/${process.env.S3_BUCKET}/${key}`
      }

      return await formatModel.addFormat(fileId, metadata)
    }

    return { error: "File format not supported" }
  }

  return { error: "Target format not supported" }
}

export default { formatFile }
