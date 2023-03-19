import { S3Client, S3ClientConfig } from "@aws-sdk/client-s3"
import multer from "multer"
import multerS3 from "multer-s3"

const s3ClientConfig: S3ClientConfig = {
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY as string
  },
  region: process.env.S3_REGION,
  endpoint: process.env.S3_ENDPOINT
}

export const s3 = new S3Client(s3ClientConfig)

/** S3 **/
export const multerS3Upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.S3_BUCKET as string,
    acl: "public-read",
    key: function (req, file, cb) {
      const path = process.env.S3_BUCKET_FOLDER as string
      cb(null, `${path}/${Date.now()}-${file.originalname}`)
    }
  }),
  limits: { fileSize: 1024 * 1024 * 30 } // 2MB
}).single("file")
