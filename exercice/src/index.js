import {extractArg} from "./utils/utils.js";
import {list, more, find, commands, addNote, saveFile} from "./controller/student.controller.js";
import readline from "node:readline";


const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
	terminal: false
})

rl.setPrompt("STUDENT > ")
rl.prompt();

rl.on("line", (chunk) => {
	const data = chunk
	let arg;
	
	let inQuestion = false
	switch(data) {
		case "list":
			console.group("Liste des élèves :")
			list()
			console.groupEnd()
			break
		
		case data.match(/^find /) ? data : null :
			arg = extractArg(data);
			find(arg)
			break
		
		case data.match(/^more /) ? data : null :
			arg = extractArg(data);
			more(arg)
			break
		
		case "addNote":
			inQuestion = true
			rl.question("A qui souhaitez vous ajouter une note ? \n", (studentName) => {
				rl.question("Quelle note souhaitez vous ajouter ? \n", (note) => {
					addNote(studentName, note);
					rl.prompt()
				})
			})
			break;
		
		case "quit":
			rl.close()
			break
		
		default:
			console.group("Commande inconnu, voici la liste des commandes disponible")
			console.table(commands, ['name'])
			console.groupEnd()
			break
	}
	if (!inQuestion) rl.prompt()
})

rl.on("close", () => {
	saveFile();
	console.log("Au revoir")
	process.exit(0);
})