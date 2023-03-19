import translateModel from "@models/translate.model"
import textsModel from "@models/texts.model"
import axios from "axios"

async function translate(id: string, language: string) {
  const text = await textsModel.getById(id)

  if (!text) return { error: "Text not found" }

  const pages = text.content.split("\n\n")
  const content = []

  for (const page of pages) {
    const pageText = page.split("\n")

    const translateResponse = await axios.post(
      "https://translate.api.cloud.yandex.net/translate/v2/translate",
      {
        folderId: process.env.TRANSLATE_FOLDER_ID,
        targetLanguageCode: language,
        texts: pageText
      },
      {
        headers: {
          Authorization: `Api-Key ${process.env.TRANSLATE_SECRET_ACCESS_KEY}`
        }
      }
    )

    const texts = translateResponse.data.translations.map((translation: any) => translation.text)
    content.push(texts.join("\n"))
  }

  const translatedText = content.join("\n\n")
  return await translateModel.addTranslation(text.fileId, id, translatedText, language)
}

export default { translate }
