// Sommaire « Sur cette page » : ouvert sur ordinateur, replié sur mobile
const sommaire = document.querySelector('.sommaire');
const ordinateur = window.matchMedia('(min-width: 1024px)');

function ajusterSommaire() {
    sommaire.open = ordinateur.matches;
}

ajusterSommaire();
ordinateur.addEventListener('change', ajusterSommaire);