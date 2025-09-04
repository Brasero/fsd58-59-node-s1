import path from "node:path"
import pug from "pug";

const cwd = process.cwd()
const viewPath = path.join(cwd, "view")
//
// const template = `
// if age >= 18
// 	h1 Accès autorisé
// else
// 	h1 Accès refusé
// `;
// const compilation = pug.compile(template);
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

// pug.renderFile(path.join(viewPath, "nav.pug"), {age: 20, name: "toto", html: `<span>Mon html</span>`, pretty: true}, (err, data) => {
// 	if (err) {
// 		console.log(err)
// 		return
// 	}
// 	console.log(data)
// })

const loggedUser = {
	name: {
		first: 'Jean',
		last: 'Dupont',
	},
	age: 36,
	birthdate: new Date('1986-04-18'),
	location: {
		zipcode: '77420',
		city: 'Champs-sur-Marne',
	},
	isAdmin: false
};
//
// pug.renderFile(path.join(viewPath, "user.pug"), {user: loggedUser, pretty: true}, (err, data) => {
// 	if (err) {
// 		console.error(err)
// 		return
// 	}
// 	console.log(data)
// })

// const users = ["Jean", "Sonia", "Mick", "Jacques"]
//
// const fruits = new Set(["Banane", "Pomme", "Fraise"]);
// pug.renderFile(path.join(viewPath, "boucle.pug"), {users, fruits, pretty: true}, (err, data) => {
// 	if (err) throw err;
// 	console.log(data)
// })

const itemMenu = [
	{
		href: "/",
		title: "Home",
	},
	{
		href: "/add",
		title: "Ajouter un utilisateur"
	}
]

pug.renderFile(path.join(viewPath, "home.pug"), {pretty: true}, (err, data) => {
	if (err) throw err;
	console.log(data)
})