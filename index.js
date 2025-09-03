import http from "node:http"
const hostname = "localhost"
const port = "8080"

const server = http.createServer((req, res) => {
	
	const url = req.url.replace("/", "")
	
	if (url === "favicon.ico") {
		res.writeHead(200, {
			"Content-Type": "image/x-icon"
		})
		res.end()
		return
	}
	
	if (url === "test") {
		res.writeHead(200, {
			"Content-Type": "text/html"
		})
		res.end(`
		<!DOCTYPE html>
		<html>
		<head>
		<title>
		Ma page html
</title>
<meta charset="utf-8" />
</head>
<body>
<h1>Ma page de test</h1>
<a href="/">Home</a>
</body>
		</html>
	`)
		return
	}
	
	res.writeHead(200, {
		"Content-Type": "text/html"
	})
	res.end(`
		<!DOCTYPE html>
		<html>
		<head>
		<title>
		Ma page html
</title>
<meta charset="utf-8" />
</head>
<body>
<h1>Ma première page web en node</h1>
<a href="/test">Page de test</a>
</body>
		</html>
	`)
	
	
	
})

server.listen(port, hostname, () => {
	console.log(`Server listening at http://${hostname}:${port}`)
})