import usersModel from "@models/users.model"

async function get() {
  return await usersModel.getAll()
}

async function getById(id: string) {
  return await usersModel.getById(id)
}

export default { get, getById }
