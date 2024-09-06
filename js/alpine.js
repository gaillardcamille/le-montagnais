const borne = () => {
    return {

        // Propriétés
        home: true,
        pageForfait: false,
        pageCours: false,
        pagePanier: false,
        nombrePanier: 0,
        panier: [],

        forfaits: [
            {
                type: "Demi-journée",
                prix: 18,
                description: "Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum ",
                image: "test"
            },
            {
                type: "Journée",
                prix: 25,
                description: "Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum ",
                image: "test"
            },
            {
                type: "Soirée",
                prix: 15,
                description: "Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum ",
                image: "test"
            },
            {
                type: "Hebdomadaire",
                prix: 85,
                description: "Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum ",
                image: "test"
            },
            {
                type: "Mensuel",
                prix: 357,
                description: "Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum ",
                image: "test"
            },
            {
                type: "Carte saisonnière",
                prix: 575,
                description: "Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum ",
                image: "test"
            }
        ],

        lecons: [
            {
                heure: 1,
                niveau: "Débutant",
                prix: 20,
                description: "Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum ",
                image: "test"
            },
            {
                heure: 1,
                niveau: "Intermédiaire",
                prix: 25,
                description: "Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum ",
                image: "test"
            },
            {
                heure: 1,
                niveau: "Avancé",
                prix: 20,
                description: "Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum ",
                image: "test"
            },
            {
                heure: 2,
                niveau: "Débutant",
                prix: 35,
                description: "Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum ",
                image: "test"
            },
            {
                heure: 2,
                niveau: "Intermédiaire",
                prix: 40,
                description: "Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum ",
                image: "test"
            },
            {
                heure: 2,
                niveau: "Avancé",
                prix: 50,
                description: "Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum ",
                image: "test"
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
                        type : "Forfait",
                        niveau : forfait.type,
                        prix : forfait.prix,
                        nombre : 1,
                    };

                    localStorage.setItem("f_" + forfait.type, JSON.stringify(produit));
                }
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
                        type : "Cours",
                        niveau : lecon.niveau,
                        heure : lecon.heure,
                        prix : lecon.prix,
                        nombre : 1,
                    };

                    localStorage.setItem("c_" + lecon.niveau + lecon.heure, JSON.stringify(produit));
                }
            }

            this.recupPanier();

            console.log(localStorage)
        },

        recupPanier() {
            let listeProduits = [];

            html = "";
            for (var i = 0; i < localStorage.length; i++){
                listeProduits.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
            }

            this.panier = listeProduits;
        },

        reset() {
            localStorage.clear();

            this.home = true;
            this.pageForfait = false;
            this.pageCours = false;
            this.pagePanier = false;
            this.nombrePanier = 0;
            this.panier = [];
        }
    }
}

// let timeout;

// function redirectToAnotherPage() {
//     window.location.href = "/"; 
// }

// function resetTimer() {
//     clearTimeout(timeout);
//     timeout = setTimeout(redirectToAnotherPage, 40000); 
// }

// document.addEventListener('click', resetTimer);

// resetTimer();