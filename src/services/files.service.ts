import filesModel from "@models/files.model"

async function getById(id: string) {
  const file = await filesModel.getById(id)

  if (!file) return { error: "File not found" }

  return file
}

export default { getById }
