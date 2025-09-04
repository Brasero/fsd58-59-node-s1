import fs from 'node:fs'
import path from "node:path"

const cwd = process.cwd()
const dataPath = path.join(cwd, "data", "users.json")
let usersFile;

try {
	usersFile = JSON.parse(fs.readFileSync(dataPath, "utf8"))
} catch (e) {
	console.error(e)
	process.exit(0)
}

export const getUsers = () => {
	return usersFile;
}

export const getUserByName = (name) => {
	return usersFile.find((user) => user.nom.toLowerCase() === name)
}

export const saveUsers = (users) => {
	fs.writeFileSync(dataPath, JSON.stringify(users, null, 2))
}