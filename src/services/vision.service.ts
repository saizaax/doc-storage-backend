import { VisionResponse } from "@app-types/vision.types"
import filesModel from "@models/files.model"
import formatModel from "@models/format.model"
import textsModel from "@models/texts.model"
import axios from "axios"

const parseVisionResponse = (data: VisionResponse) => {
  const pagesArray =
    data?.results?.flatMap((pageItem) =>
      pageItem.results.flatMap((resultsItem) => resultsItem.textDetection.pages)
    ) || []

  const linesArray = pagesArray.flatMap((page) =>
    page.blocks.flatMap((block) => block.lines.map((line) => line.words.map((word) => word.text).join(" ")))
  )

  // TODO: fix incorrect page splitting
  const pages = linesArray.reduce((result: string[][], line, index) => {
    const pageNumber = Math.floor(index / (linesArray.length / pagesArray.length))

    if (!result[pageNumber]) result[pageNumber] = []

    result[pageNumber].push(line)
    return result
  }, [])

  return pages
}

async function analyze(id: string) {
  const file = await filesModel.getById(id)
  const format = await formatModel.getById(id)

  const analyzeItem = file ? file : format
  if (!analyzeItem) return { error: "File not found" }

  const analyzeContent = await axios.get(analyzeItem.url, { responseType: "arraybuffer" })
  const analyzeBase64 = Buffer.from(analyzeContent.data, "binary").toString("base64")

  const visionResponse = await axios.post(
    "https://vision.api.cloud.yandex.net/vision/v1/batchAnalyze",
    {
      folderId: process.env.VISION_FOLDER_ID,
      analyze_specs: [
        {
          mimeType: analyzeItem.format,
          content: analyzeBase64,
          features: [
            {
              type: "TEXT_DETECTION",
              text_detection_config: {
                language_codes: ["*"]
              }
            }
          ]
        }
      ]
    },
    {
      headers: {
        Authorization: `Api-Key ${process.env.VISION_SECRET_ACCESS_KEY}`
      }
    }
  )

  const response = parseVisionResponse(visionResponse.data)
  const pages = response.map((page) => page.join("\n"))
  const text = pages.join("\n\n")

  return await textsModel.addText(id, text)
}

export default { analyze }
