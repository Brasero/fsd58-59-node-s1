import dotenv from "dotenv"

dotenv.config(/*{
	path: "custom/path/to/.env" // pour préciser le chemin vers le fichier .env s'il n'est pas à la racine
}*/)

console.log(process.env.MA_VARIABLE)

// console.log(m.name)
// console.log(m.addition(1, 2))
// process.stdin.on('data', (chunk) => {
// 	const text = chunk.toString().replace("\n", "");
//
// 	if (!text.includes("exit")) {
// 		console.log(text)
// 		return
// 	}
// 	process.exit(0)
// })
//
// console.log("hello")



// const os = require("node:os")
//
// console.log(os.userInfo())
//
// process.env.EXEMPLE = "texte"
//
// process.stdout.write("ceci est un console.log")
//
// process.stderr.write("erreur")
// console.log(process.env.EXEMPLE)


//setTimeout(() => console.log("Asynchrone"), 1000)
// const showResult = () => {
// 	console.log(sum(5,2))
// }
//
// const sum  = (a,b) => {
// 	return a+b;
// }
//
//
//
// showResult();