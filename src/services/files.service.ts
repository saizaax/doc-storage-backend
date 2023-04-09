import filesModel from "@models/files.model"

async function getById(id: string) {
  const file = await filesModel.getById(id)

  if (!file) return { error: "File not found" }

  return file
}

async function getByUserId(userId: string) {
  const docs = await filesModel.getByUserId(userId)

  const files = docs?.Document?.map((item) => item?.File).flat()

  return files
}

export default { getById, getByUserId }
