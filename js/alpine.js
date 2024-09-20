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
		popupTimer: null,
		countdown: 15,
		inactivityPopup: false,

		forfaits: [
			{
				type: "Demi-journée",
				prix: 18,
				description: "Profitez d'une expérience immersive durant une demi-journée. Idéal pour découvrir nos activités et vous initier dans un cadre convivial et détendu.",
				image: "img/forfaits/demi-journee.webp",
				nombre: 0,
			},
			{
				type: "Journée",
				prix: 25,
				description: "Passez une journée complète à explorer et vous divertir. Ce forfait vous offre l'accès à toutes nos installations et à des activités variées pour un maximum de plaisir.",
				image: "img/forfaits/journee.webp",
				nombre: 0,
			},
			{
				type: "Soirée",
				prix: 15,
				description: "Vivez une soirée agréable avec notre forfait soirée. Parfait pour se détendre après une longue journée, ce forfait inclut des activités nocturnes et des animations.",
				image: "img/forfaits/soiree.webp",
				nombre: 0,
			},
			{
				type: "Hebdomadaire",
				prix: 85,
				description: "Bénéficiez d'un accès illimité pendant une semaine. Parfait pour ceux qui souhaitent s'engager dans une routine régulière tout en profitant de nos services.",
				image: "img/forfaits/hebdomadaire.webp",
				nombre: 0,
			},
			{
				type: "Mensuel",
				prix: 357,
				description: "Optez pour notre forfait mensuel et profitez d'un accès complet à toutes nos activités et installations, idéal pour un engagement à long terme.",
				image: "img/forfaits/mensuel.webp",
				nombre: 0,
			},
			{
				type: "Annuel",
				prix: 575,
				description: "Profitez de notre forfait annuel pour un accès illimité tout au long de l'année. C'est l'option la plus économique pour ceux qui souhaitent tirer le meilleur parti de nos services.",
				image: "img/forfaits/annuel.webp",
				nombre: 0,
			}
		],

		lecons: [
			{
				heure: 1,
				niveau: "Débutant",
				prix: 20,
				description: "Initiez-vous à nos activités avec cette leçon d'une heure adaptée aux débutants. Parfaite pour acquérir les bases et découvrir votre potentiel.",
				image: "img/cours/debutant1h.webp",
				nombre: 0,
			},
			{
				heure: 2,
				niveau: "Débutant",
				prix: 35,
				description: "Profitez d'une leçon de deux heures pour approfondir vos connaissances et améliorer vos compétences. Idéal pour les novices désireux d'aller plus loin.",
				image: "img/cours/debutant2h.webp",
				nombre: 0,
			},
			{
				heure: 1,
				niveau: "Intermédiaire",
				prix: 25,
				description: "Développez vos compétences avec cette leçon d'une heure pour le niveau intermédiaire. Adaptée aux élèves ayant déjà quelques bases.",
				image: "img/cours/intermediaire1h.webp",
				nombre: 0,
			},
			{
				heure: 2,
				niveau: "Intermédiaire",
				prix: 40,
				description: "Renforcez vos acquis et explorez de nouvelles techniques avec cette leçon de deux heures. Idéal pour les élèves souhaitant passer au niveau supérieur.",
				image: "img/cours/test.jpg",
				nombre: 0,
			},
			{
				heure: 1,
				niveau: "Avancé",
				prix: 20,
				description: "Cette leçon d'une heure est conçue pour les élèves avancés souhaitant perfectionner leurs techniques et stratégies dans un cadre stimulant.",
				image: "img/cours/avance1h.webp",
				nombre: 0,
			},
			{
				heure: 2,
				niveau: "Avancé",
				prix: 50,
				description: "Poussez vos limites avec cette leçon intensive de deux heures. Parfaite pour celles et ceux qui veulent atteindre l'excellence dans leur pratique.",
				image: "img/cours/avance2h.webp",
				nombre: 0,
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
					forfait.nombre++;

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

					forfait.nombre++;

					localStorage.setItem("f_" + forfait.type, JSON.stringify(produit));
				}

				this.sous_total += forfait.prix
			}

			if (lecon != 0) {
				if (localStorage.getItem("c_" + lecon.niveau + lecon.heure)) {
					produit = JSON.parse(localStorage.getItem("c_" + lecon.niveau + lecon.heure));

					let nombreItem = produit.nombre;
					produit.nombre = nombreItem + 1;
					lecon.nombre++;

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

					lecon.nombre++;

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
				const shoppingCart = document.getElementById('shoppingCart');
				shoppingCart.classList.remove('open');
				this.pagePanier = false;

			}

			this.recupPanier();
		},

		showDescription(produit) {
			const productDescription = document.getElementById('productDescription');

			this.description = true;
			this.produitDescription = produit;
			productDescription.classList.add('open');
			console.log(produit)
		},

		removeBackground() {
			const shoppingCart = document.getElementById('shoppingCart');
			shoppingCart.classList.remove('open');
			this.pagePanier = false;

			const productDescription = document.getElementById('productDescription');
			productDescription.classList.remove('open');
			this.description = false;
		},

		openPanier() {
			const buttonPanier = document.getElementById('buttonPanier');
			const shoppingCart = document.getElementById('shoppingCart');

			if (this.nombrePanier) {
				this.pagePanier = true;
				shoppingCart.classList.add('open');
			} else {
				buttonPanier.classList.add('cantOpen');

				setTimeout(() => {
					buttonPanier.classList.remove('cantOpen');
				}, 500);
			}
		},

		reset() {
			localStorage.clear();
			productDescription.classList.remove('open');
			shoppingCart.classList.remove('open');

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
			this.timer = null;
			this.popupTimer = null;
			this.countdown = 15;
			this.inactivityPopup = false;
		},

		buy(int) {

			if (int == 0) {
				const shoppingCart = document.getElementById('shoppingCart');
				shoppingCart.classList.remove('open');
				this.pagePanier = false;
				this.moyenPaiement = true;
			}


			this.numero = Math.floor(Math.random() * 200) + 1;
			console.log(this.numero)

			if (int == 1) {
				this.etape = 1;

				setTimeout(() => {
					this.etape = 2;

					setTimeout(() => {
						this.reset();
					}, 5000);

				}, 7000);
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
					this.inactivityPopup = true;
					this.countdown = 15;
					this.startPopupTimer();
				}, 40000);
			}
		},

		startPopupTimer() {
			if (this.inactivityPopup) {
				clearInterval(this.popupTimer);
				this.popupTimer = setInterval(() => {
					if (this.countdown > 0) {
						this.countdown--;
					} else {
						clearInterval(this.popupTimer);
						this.reset();
					}
				}, 1000);
			}
		},

		init() {
			document.addEventListener('click', () => {
				if (this.inactivityPopup) {
					this.countdown = 15;
					this.inactivityPopup = false;
					clearInterval(this.popupTimer);
				}
				this.inactivityTimer();
			});

			window.addEventListener('load', () => {
				this.inactivityTimer();
			});
		}

	}
}
