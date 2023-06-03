import { prisma } from "@/index"

async function getById(id: string) {
  return await prisma.translation.findUnique({
    where: {
      id: id
    }
  })
}

async function addTranslation(fileId: string, textId: string, content: string, language: string) {
  return await prisma.translation.create({
    data: {
      content: content,
      language: language,
      created_at: new Date(),
      updated_at: new Date(),
      textId: textId,
      fileId: fileId
    }
  })
}

async function removeText(id: string) {
  return await prisma.translation.delete({
    where: {
      id: id
    }
  })
}

export default { addTranslation, removeText, getById }
