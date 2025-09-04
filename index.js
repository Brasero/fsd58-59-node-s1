import http from "node:http"
import fs from "node:fs";
import path from "node:path"
import {getUserByName, getUsers, saveUsers} from "./controller/user.controller.js";
import * as querystring from "querystring";

const cwd = process.cwd()
const viewPath = path.join(cwd, "view")
const headerPath = path.join(viewPath, "__header.html")
const footerPath = path.join(viewPath, "__footer.html")
const publicPath = path.join(cwd, "public")

const hostname = "localhost"
const port = "8080"


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
	
	if (url === "") {
		const users = getUsers()
		let html = header;
		users.forEach((user) => {
			html += `<a href="/detail/${user.nom.toLowerCase()}">${user.nom}</a><br />`
		});
		html += footer;
		res.writeHead(200, {
			"content-type": "text/html"
		})
		res.end(html)
		return
	}
	
	if (url.startsWith("detail")) {
		const name = url.split("/").pop()
		const user = getUserByName(name)
		
		if (!user) {
			res.writeHead(404, {
				"content-type": "text/html"
			})
			res.end(`${header}
			<div>
				<p>Utilisateur introuvable</p>
				<a href="/">Retour</a>
			</div>
			${footer}
			`)
			return
		}
		let html = header;
		html += `
			<div>
				<p>Nom : ${user.nom}</p>
				<p>Email : ${user.email}</p>
				<p>Role : ${user.role}</p>
			</div>
			<div><a href="/">Retour</a></div>
		`
		html += footer
		res.writeHead(200, {
			"content-type": "text/html"
		})
		res.end(html)
		return
	}
	
	if (url === "add") {
		fs.readFile(path.join(viewPath, "__form.html"), "utf8", (err, form) => {
			if (err) {
				res.writeHead(500, {
					"content-type": "text/html"
				})
				res.end("Erreur de server")
				return
			}
			if (req.method === "GET") {
				const html = header + form + footer
				res.writeHead(200, {"content-type": "text/html"})
				res.end(html)
				return
			}
			
			if (req.method === "POST") {
				let body = "";
				req.on("data", (chunk) => {
					body += chunk.toString()
				})
				 .on("end", () => {
					 const data = querystring.parse(body)
					 if (!data.name || data.name.trim() === "" || !data.mail || data.mail.trim() === "") {
						 res.writeHead(200, {
							 "content-type": "text/html"
						 })
						 let html = header + `<span style="color: red;">Merci de bien compléter tous les champs.</span>` + form + footer;
						 res.end(html)
						 return
					 }
					 const user = {
						 nom: data.name.trim(),
						 email: data.mail.trim(),
						 role: "utilisateur"
					 }
					 const users = getUsers()
					 users.push(user)
					 saveUsers(users)
					 res.writeHead(301, {
						 "location": "/"
					 })
					 res.end()
				 })
			}
		})
		return
	}
	
})

server.listen(port, hostname, () => {
	console.log(`Server listening at http://${hostname}:${port}`)
})