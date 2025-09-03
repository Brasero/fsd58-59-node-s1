import readline from "readline";
import dotenv from "dotenv";
import Chifoumi from "./src/chifoumi.js";

dotenv.config();

const {APP_SHEET, APP_ROCK, APP_SCISSOR} = process.env

const game = new Chifoumi(APP_ROCK, APP_SHEET, APP_SCISSOR);

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
	terminal: false
})


const commands = {
	start: {
		name: "start",
		description: "Lance une partie de 3 manches"
	},
	stats: {
		name: 'stats',
		description: "Affiche les statistique des parties jouées"
	},
	reset: {
		name: "reset",
		description: "Reinitialise les statistiques de partie"
	}
}

rl.setPrompt("CHIFOUMI >> ")
rl.prompt()

rl.on("line", (line) => {
	switch (line) {
		
		case "start":
			game.run()
			break;
		
		case "stats":
			game.displayStats()
			break;
			
		case "reset":
			game.resetStats()
			break;
			
		default:
			console.log("Commande inconnue")
			console.group("Liste des commandes disponible")
			console.table(commands)
			console.groupEnd()
	}
	
	rl.prompt()
}).on("end", () => {
	console.log("Au revoir")
	process.exit(0)
})