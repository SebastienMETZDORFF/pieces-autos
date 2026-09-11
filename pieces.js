// Récupération des pièces depuis le fichier JSON
const reponse = await fetch("pieces-autos.json");
const pieces = await reponse.json();

function genererPieces(pieces) {
    for (let i = 0; i < pieces.length; i++) {
        const article = pieces[i];
        // Récupération de l'élément du DOM qui accueillera les fiches
        const sectionFiches = document.querySelector(".fiches");
        // Création d’une balise dédiée à une pièce automobile
        const pieceElement = document.createElement("article");
        // Création des balises
        const imageElement = document.createElement("img");
        imageElement.src = article.image;
        const nomElement = document.createElement("h2");
        nomElement.innerText = article.nom;
        const prixElement = document.createElement("p");
        prixElement.innerText = `Prix: ${article.prix} € (${article.prix < 35 ? "€" : "€€€"})`;
        const categorieElement = document.createElement("p");
        categorieElement.innerText = article.categorie ?? "(aucune catégorie)";
        const descriptionElement = document.createElement("p");
        descriptionElement.innerText = article.description ?? "Pas de description pour le moment.";
        const stockElement = document.createElement("p");
        stockElement.innerText = article.disponibilite ? "En stock" : "Rupture de stock";

        // On rattache la balise article a la section Fiches
        sectionFiches.appendChild(pieceElement);
        // On rattache les autres balises à pieceElement (la balise article)
        pieceElement.appendChild(imageElement);
        pieceElement.appendChild(nomElement);
        pieceElement.appendChild(prixElement);
        pieceElement.appendChild(categorieElement);
        pieceElement.appendChild(descriptionElement);
        pieceElement.appendChild(stockElement);
    }
}

genererPieces(pieces);


// Gestion des boutons
const boutonTrierCroissant = document.querySelector(".btn-trier-croissant");
boutonTrierCroissant.addEventListener("click", () => {
    const piecesOrdonnees = Array.from(pieces);

    piecesOrdonnees.sort((a, b) => {
        return a.prix - b.prix;
    });

    document.querySelector(".fiches").innerHTML = "";
    genererPieces(piecesOrdonnees);
});

const boutonTrierDecroissant = document.querySelector(".btn-trier-decroissant");
boutonTrierDecroissant.addEventListener("click", () => {
    const piecesOrdonnees = Array.from(pieces);

    piecesOrdonnees.sort((a, b) => {
        return b.prix - a.prix;
    });

    document.querySelector(".fiches").innerHTML = "";
    genererPieces(piecesOrdonnees);
});

const boutonFiltrerAbordables = document.querySelector(".btn-filtrer-abordables");
boutonFiltrerAbordables.addEventListener("click", () => {
    const piecesFiltrees = pieces.filter((piece) => {
        return piece.prix <= 35;
    });
    
    document.querySelector(".fiches").innerHTML = "";
    genererPieces(piecesFiltrees);
});

const boutonFiltrerDescription = document.querySelector(".btn-filtrer-description");
boutonFiltrerDescription.addEventListener("click", () => {
    const piecesFiltrees = pieces.filter((piece) => {
        return piece.description;
    });

    document.querySelector(".fiches").innerHTML = "";
    genererPieces(piecesFiltrees);
});

const noms = pieces.map(piece => piece.nom);
for (let i = pieces.length - 1; i >= 0; i--) {
    if (pieces[i].prix > 35) {
        noms.splice(i,1);
    }
}

// Création de l'en-tête
const pElement = document.createElement("p");
pElement.innerText = "Pièces abordables";
//Création de la liste
const abordablesElement = document.createElement('ul');
//Ajout de chaque nom à la liste
for (let i = 0; i < noms.length ; i++) {
    const nomElement = document.createElement('li');
    nomElement.innerText = noms[i];
    abordablesElement.appendChild(nomElement)
}
// Ajout de l'en-tête puis de la liste au bloc résultats filtres
document.querySelector('.abordables')
    .appendChild(pElement)
    .appendChild(abordablesElement);

// Pièces disponibles
const nomsDisponibles = pieces.map(piece => piece.nom);
const prixDisponibles = pieces.map(piece => piece.prix);
for (let i = pieces.length - 1; i >= 0; i--) {
    if (!pieces[i].disponibilite) {
        nomsDisponibles.splice(i,1);
        prixDisponibles.splice(i,1);
    }
}

const pElementDisponible = document.createElement("p");
pElementDisponible.innerText = "Pièces disponibles"
const disponiblesElement = document.createElement('ul');
for (let i = 0; i < nomsDisponibles.length; i++) {
    const nomElement = document.createElement('li');
    nomElement.innerText = `${nomsDisponibles[i]} - ${prixDisponibles[i]} €`;
    disponiblesElement.appendChild(nomElement);
}
document.querySelector('.disponibles')
    .appendChild(pElementDisponible)
    .appendChild(disponiblesElement);

const inputPrixMax = document.getElementById("prix-max");
inputPrixMax.addEventListener("input", () => {
    const piecesFiltrees = pieces.filter((piece) => {
        return piece.prix <= inputPrixMax.value;
    });

    document.querySelector(".fiches").innerHTML = "";
    genererPieces(piecesFiltrees);
});