import http from "node:http"
import fs from "node:fs";
import path from "node:path"
import querystring from "node:querystring";
import {users} from "./data/user.js";
import {shuffle} from "./utils/shuffle.js";

const cwd = process.cwd()
const viewPath = path.join(cwd, "view")
const headerPath = path.join(viewPath, "__header.html")
const footerPath = path.join(viewPath, "__footer.html")
const publicPath = path.join(cwd, "public")

const hostname = "localhost"
const port = "8080"

let customUsers = [...users];

const server = http.createServer((req, res) => {
	
	const url = req.url.replace("/", "")
	
	const header = fs.readFileSync(headerPath, "utf8")
	const footer = fs.readFileSync(footerPath, "utf8")
	
	if (url === "favicon.ico") {
		res.writeHead(200, {
			"Content-Type": "image/x-icon"
		})
		res.end()
		return
	}
	
	if (url.startsWith("style")) {
		const filename = url.split("/")[1]
		fs.readFile(path.join(publicPath, filename), "utf8", (err, data) => {
			if(err) {
				res.writeHead(404, {
					"Content-Type": "text/plain"
				})
				res.end(JSON.stringify(err))
			}
			res.writeHead(200, {
				"Content-Type": "text/css"
			})
			res.end(data)
		})
		return
	}
	
	
	if(url === "shuffle") {
		customUsers = shuffle(customUsers)
		res.writeHead(302, {
			"Location": "/"
		})
		res.end()
		return
	}
	
	if (url === "" && req.method === "POST") {
		let body = "";
		req.on("data", (chunk) => {
			body += chunk.toString()
		})
		
		req.on("end", () => {
			// const bodyArray = body.split("&")
			// const obj = {}
			// bodyArray.forEach((data) => {
			// 	const [key, value] = data.split("=")
			// 	obj[key] = value
			// })
			// console.log(obj)
			
			//La ligne suivante remplace tout le code au dessus.
			const obj = querystring.parse(body)
			console.log(obj)
			
			if (!obj.name || obj.name.trim() === "") {
				res.writeHead(401, {"Content-Type": "text/plain; charset=utf8"})
				res.end("Le champ name ne peut pas être vide.")
				return
			}
			
			customUsers.push(obj.name)
			res.writeHead(301, {
				"Location": "/"
			})
			res.end()
		})
		return
	}
	
	res.writeHead(200, {
		"Content-Type": "text/html"
	})
	res.end(`
		${header}
		<h1>Liste des utilisateurs</h1>
		<ul>
		${customUsers.map((u) => (`<li>${u}</li>`)).join("")}
		</ul>
		<a href="/shuffle">Mélanger les utilisateurs</a>
		<form method="POST" action="/">
			<input type="text" name="name" />
			<input type="text" name="age" />
			<input type="submit" value="Ajouter" />
		</form>
		${footer}
	`)
})

server.listen(port, hostname, () => {
	console.log(`Server listening at http://${hostname}:${port}`)
})