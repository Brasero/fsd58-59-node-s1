class Chifoumi {
	
	constructor(rock, sheet, scissor) {
		
		this.rock = rock
		this.sheet = sheet
		this.scissor = scissor
		
		this.stats = {
			manche: {
				qte: 0,
				j1: 0,
				j2: 0,
				equality: 0
			}
		}
	}
	
	run() {
		for (let mancheNb = 0; mancheNb < 3; mancheNb++) {
			this.stats.manche.qte++;
			const [signe1, signe2] = this.getRandomSigne()
			console.log(`Manche n${mancheNb + 1}, \n J1 : ${signe1} vs J2 : ${signe2}`)
			const winner = this.getWinner(signe1, signe2)
			
			if (!winner) {
				console.log("Manche nulle")
				this.stats.manche.equality++
			} else {
				console.log(`Le joueur ${winner} à gagné`)
				this.stats.manche[`j${winner}`]++
			}
		}
		this.getGameWinner();
	}
	
	getRandomSigne() {
		const signes = [this.rock, this.sheet, this.scissor]
		return [
		 signes[Math.floor(Math.random() * signes.length)],
		 signes[Math.floor(Math.random() * signes.length)]
		]
	}
	
	getWinner(signe1, signe2) {
		if (signe1 === signe2) {
			return null
		}
		
		switch(signe1) {
			case this.rock:
				return signe2 === this.sheet ? 2 : 1
			case this.sheet:
				return signe2 === this.scissor ? 2 : 1
			case this.scissor:
				return signe2 === this.rock ? 2 : 1
		}
	}
	
	getGameWinner() {
		const winner = this.stats.manche.j1 === this.stats.manche.j2 ? null :
		 this.stats.manche.j1 > this.stats.manche.j2 ? 1 : 2
		
		if (!winner) {
			console.log("La partie s'est soldé par une égalité")
			return
		}
		console.log(`Le joueur ${winner} à gagné la partie avec ${this.stats.manche[`j${winner}`]} manches.`)
	}
	
	displayStats() {
		if (this.stats.manche.qte === 0) {
			console.log("Aucune statistiques à afficher")
			return
		}
		
		console.group("Statistique de partie")
			console.log(`Nombre de manche jouées : ${this.stats.manche.qte}`)
			console.log(`Nombre de manches gagnées par le joueur 1 : ${this.stats.manche.j1}`)
			console.log(`Nombre de manches gagnées par le joueur 2 : ${this.stats.manche.j2}`)
			console.log(`Nombre de manches nulle : ${this.stats.manche.equality}`)
		console.groupEnd()
	}
	
	resetStats() {
		this.stats = {
			manche: {
				qte: 0,
				j1: 0,
				j2: 0,
				equality: 0
			}
		}
		console.log("Statistiques réinitialisées.")
	}
	
}

export default Chifoumi