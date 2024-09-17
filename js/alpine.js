const borne = () => {
	localStorage.clear();
	return {

		// Propriétés
		home: true,
		pageForfait: false,
		pageCours: false,
		pagePanier: false,
		nombrePanier: 0,
		description: false,
		produitDescription: [],
		panier: [],
		sous_total: 0,
		tps: 0,
		tvq: 0,
		total: 0,
		moyenPaiement: false,
		numero: 0,
		etape: 0,
		timer: null,

		forfaits: [
			{
				type: "Demi-journée",
				prix: 18,
				description: "Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum ",
				image: "img/cours-ski-1.webp"
			},
			{
				type: "Journée",
				prix: 25,
				description: "Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum ",
				image: "img/cours-ski-1.webp"
			},
			{
				type: "Soirée",
				prix: 15,
				description: "Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum ",
				image: "img/cours-ski-1.webp"
			},
			{
				type: "Hebdomadaire",
				prix: 85,
				description: "Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum ",
				image: "img/cours-ski-1.webp"
			},
			{
				type: "Mensuel",
				prix: 357,
				description: "Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum ",
				image: "img/cours-ski-1.webp"
			},
			{
				type: "Annuel",
				prix: 575,
				description: "Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum ",
				image: "img/cours-ski-1.webp"
			}
		],

		lecons: [
			{
				heure: 1,
				niveau: "Débutant",
				prix: 20,
				description: "Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum ",
				image: "img/debutant.webp"
			},
			{
				heure: 2,
				niveau: "Débutant",
				prix: 35,
				description: "Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum ",
				image: "img/cours-ski-1.webp"
			},
			{
				heure: 1,
				niveau: "Intermédiaire",
				prix: 25,
				description: "Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum ",
				image: "img/cours-ski-1.webp"
			},
			{
				heure: 2,
				niveau: "Intermédiaire",
				prix: 40,
				description: "Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum ",
				image: "img/cours-ski-1.webp"
			},
			{
				heure: 1,
				niveau: "Avancé",
				prix: 20,
				description: "Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum ",
				image: "img/avance.webp"
			},
			{
				heure: 2,
				niveau: "Avancé",
				prix: 50,
				description: "Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum ",
				image: "img/cours-ski-1.webp"
			}
		],

		// Fonctions
		ajouterPanier(forfait, lecon) {
			this.nombrePanier += 1;
			let produit;

			if (forfait != 0) {
				if (localStorage.getItem("f_" + forfait.type)) {
					produit = JSON.parse(localStorage.getItem("f_" + forfait.type));

					let nombreItem = produit.nombre;
					produit.nombre = nombreItem + 1;

					localStorage.setItem("f_" + forfait.type, JSON.stringify(produit))
				}
				else {
					produit = {
						type: "Forfait",
						niveau: forfait.type,
						prix: forfait.prix,
						nombre: 1,
						image: forfait.image,
					};

					localStorage.setItem("f_" + forfait.type, JSON.stringify(produit));
				}

				this.sous_total += forfait.prix
			}

			if (lecon != 0) {
				if (localStorage.getItem("c_" + lecon.niveau + lecon.heure)) {
					produit = JSON.parse(localStorage.getItem("c_" + lecon.niveau + lecon.heure));

					let nombreItem = produit.nombre;
					produit.nombre = nombreItem + 1;

					localStorage.setItem("c_" + lecon.niveau + lecon.heure, JSON.stringify(produit))
				}
				else {
					produit = {
						type: "Cours",
						niveau: lecon.niveau,
						heure: lecon.heure,
						prix: lecon.prix,
						nombre: 1,
						image: lecon.image,
					};

					localStorage.setItem("c_" + lecon.niveau + lecon.heure, JSON.stringify(produit));
				}

				this.sous_total += lecon.prix
			}

			this.recupPanier();
		},

		recupPanier() {
			let listeProduits = [];

			for (var i = 0; i < localStorage.length; i++) {
				listeProduits.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
			}

			this.panier = listeProduits;

			this.tps = (5 * this.sous_total / 100).toFixed(2);
			this.tvq = (9.975 * this.sous_total / 100).toFixed(2);
			this.total = (parseFloat(this.sous_total) + parseFloat(this.tps) + parseFloat(this.tvq)).toFixed(2);

			console.log(listeProduits)
		},

		nombreProduit(produit, nombre) {

			if (produit.type == "Forfait") {
				if (nombre != 2) {
					newProduit = JSON.parse(localStorage.getItem("f_" + produit.niveau));

					newProduit.nombre += nombre;

					if (newProduit.nombre == 0) {
						localStorage.removeItem("f_" + produit.niveau);
					}
					else {
						localStorage.setItem("f_" + produit.niveau, JSON.stringify(newProduit))
					}
				}
				else {
					localStorage.removeItem("f_" + produit.niveau);
				}
			}

			if (produit.type == "Cours") {
				if (nombre != 2) {
					newProduit = JSON.parse(localStorage.getItem("c_" + produit.niveau + produit.heure));

					newProduit.nombre += nombre;

					if (newProduit.nombre == 0) {
						localStorage.removeItem("c_" + produit.niveau + produit.heure);
					}
					else {
						localStorage.setItem("c_" + produit.niveau + produit.heure, JSON.stringify(newProduit))
					}
				}
				else {
					localStorage.removeItem("c_" + produit.niveau + produit.heure);
				}
			}

			switch (nombre) {
				case -1:
					this.sous_total -= produit.prix
					this.nombrePanier -= 1;
					break;
				case 1:
					this.sous_total += produit.prix
					this.nombrePanier += 1;
					break;
				case 2:
					this.sous_total -= produit.prix * produit.nombre;
					this.nombrePanier -= produit.nombre;
					break;
			}

			if (this.nombrePanier == 0) {
				this.pagePanier = false;
			}

			this.recupPanier();
		},

		showDescription(produit) {
			this.description = true;
			this.produitDescription = produit;
			console.log(this.produitDescription)
		},

		removeBackground() {
			this.description = false;
			this.pagePanier = false;
		},

		openPanier() {
			const buttonPanier = document.getElementById('buttonPanier');
			if (this.nombrePanier) {
				this.pagePanier = true;
			} else {
				buttonPanier.classList.add('cantOpen');
				
				setTimeout(() => {
					buttonPanier.classList.remove('cantOpen');
				}, 500);
			}
		},

		reset() {
			localStorage.clear();

			this.home = true;
			this.pageForfait = false;
			this.pageCours = false;
			this.pagePanier = false;
			this.description = false;
			this.nombrePanier = 0;
			this.panier = [];
			this.produitDescription = [];
			this.sous_total = 0;
			this.tps = 0;
			this.tvq = 0;
			this.total = 0;
			this.moyenPaiement = false;
			this.etape = 0;
		},

		buy(int) {
			this.numero = Math.floor(Math.random() * 200) + 1;
			console.log(this.numero)

			if (int == 1) {
				this.etape = 1;

				setTimeout(() => {
					this.etape = 2;

					setTimeout(() => {
						this.reset();
					}, 5000);

				}, 10000);
			}

			if (int == 2) {
				this.etape = 2;

				setTimeout(() => {
					this.reset();
				}, 5000);
			}
		},


		// Inactivité
		inactivityTimer() {
			if (this.home != true) {
				clearTimeout(this.timer);
				this.timer = setTimeout(() => {
					this.reset();
				}, 35000);
			}
		},

		init() {
			document.addEventListener('click', () => this.inactivityTimer());

			window.addEventListener('load', () => this.inactivityTimer());
		},
	}
}
