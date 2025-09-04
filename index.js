import path from "node:path"
import pug from "pug";

const cwd = process.cwd()
const viewPath = path.join(cwd, "view")

const menuItems = [
	{ path: '/', title: 'Home', isActive: true },
	{ path: '/about-me', title: 'About', isActive: false },
	{ path: '/references', title: 'References', isActive: false },
	{ path: '/contact-me', title: 'Contact', isActive: false },
];

pug.renderFile(path.join(viewPath, "home.pug"), {menuItems, pretty: true}, (err, data) => {
	if(err) throw err;
	console.log(data)
})