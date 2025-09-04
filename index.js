import path from "node:path"
import pug from "pug";

const cwd = process.cwd()
const viewPath = path.join(cwd, "view")

const template = `
if age >= 18
	h1 Accès autorisé
else
	h1 Accès refusé
`;
const compilation = pug.compile(template);
// console.log(compilation({age: 17}));

// pug.render(template, {age: 17}, (err, data) => {
// 	if (err) {
// 		console.error(err)
// 		return
// 	}
// 	console.log(data)
// })

// try {
// 	const compileFile = pug.compileFile(path.join(viewPath, "exemple.pug"))
// 	console.log(compileFile({age: 17}))
// } catch(e) {
// 	console.error(e)
// }

// pug.renderFile(path.join(viewPath, "exemple.pug"), {age: 19}, (err, data) => {
// 	if (err) {
// 		console.error(err)
// 		return
// 	}
// 	console.log(data)
// })

pug.renderFile(path.join(viewPath, "nav.pug"), {age: 20, name: "toto", html: `<span>Mon html</span>`, pretty: true}, (err, data) => {
	if (err) {
		console.log(err)
		return
	}
	console.log(data)
})

// const server = http.createServer((req, res) => {
//
// 	const url = req.url.replace("/", "")
//
// 	const header = fs.readFileSync(headerPath, "utf8")
// 	const footer = fs.readFileSync(footerPath, "utf8")
//
// 	if (url === "favicon.ico") {
// 		res.writeHead(200, {
// 			"Content-Type": "image/x-icon"
// 		})
// 		res.end()
// 		return
// 	}
//
// 	if (url.startsWith("style")) {
// 		const filename = url.split("/")[1]
// 		fs.readFile(path.join(publicPath, filename), "utf8", (err, data) => {
// 			if(err) {
// 				res.writeHead(404, {
// 					"Content-Type": "text/plain"
// 				})
// 				res.end(JSON.stringify(err))
// 			}
// 			res.writeHead(200, {
// 				"Content-Type": "text/css"
// 			})
// 			res.end(data)
// 		})
// 		return
// 	}
//
//
//
// })
//
// server.listen(port, hostname, () => {
// 	console.log(`Server listening at http://${hostname}:${port}`)
// })