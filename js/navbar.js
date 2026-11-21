/* ==========================================================
   navbar.js – Menu burger (mobile) + sous-menu "Comprendre la maladie"
   À charger avec l'attribut defer (le HTML est déjà lu quand il s'exécute).
   ========================================================== */

const boutonBurger = document.querySelector(".bouton-burger");
const menu = document.getElementById("menu-principal");
const boutonDeroulant = document.querySelector(".menu-deroulant-bouton");
const sousMenu = document.getElementById("sous-menu-maladie");

// Même valeur que le @media (min-width: 1200px) du CSS (partie en-tête)
const ecranOrdinateur = window.matchMedia("(min-width: 1200px)");

/* ---------- Menu burger ---------- */
function ouvrirMenu() {
  menu.classList.add("est-ouvert");
  boutonBurger.setAttribute("aria-expanded", "true");
  // On place le focus sur le premier lien pour les utilisateurs clavier
  menu.querySelector("a, button").focus();
}

function fermerMenu(rendreFocus) {
  menu.classList.remove("est-ouvert");
  boutonBurger.setAttribute("aria-expanded", "false");
  if (rendreFocus) {
    boutonBurger.focus();
  }
}

if (boutonBurger && menu) {
  boutonBurger.addEventListener("click", function () {
    const estOuvert = boutonBurger.getAttribute("aria-expanded") === "true";
    if (estOuvert) {
      fermerMenu(false);
    } else {
      ouvrirMenu();
    }
  });

  // Si on agrandit la fenêtre en mode ordinateur, on remet le menu à zéro
  ecranOrdinateur.addEventListener("change", function () {
    fermerMenu(false);
    fermerSousMenu();
  });
}

/* ---------- Sous-menu "Comprendre la maladie" ---------- */
function fermerSousMenu() {
  if (!sousMenu) return;
  sousMenu.classList.remove("est-ouvert");
  boutonDeroulant.setAttribute("aria-expanded", "false");
}

if (boutonDeroulant && sousMenu) {
  boutonDeroulant.addEventListener("click", function () {
    const estOuvert = boutonDeroulant.getAttribute("aria-expanded") === "true";
    sousMenu.classList.toggle("est-ouvert", !estOuvert);
    boutonDeroulant.setAttribute("aria-expanded", String(!estOuvert));
  });

  // Clic en dehors du sous-menu (sur ordinateur) : on le ferme
  document.addEventListener("click", function (evenement) {
    if (ecranOrdinateur.matches && !boutonDeroulant.parentElement.contains(evenement.target)) {
      fermerSousMenu();
    }
  });
}

/* ---------- Touche Échap : ferme le sous-menu puis le menu ---------- */
document.addEventListener("keydown", function (evenement) {
  if (evenement.key !== "Escape") return;

  if (sousMenu && sousMenu.classList.contains("est-ouvert")) {
    fermerSousMenu();
    boutonDeroulant.focus();
  } else if (menu && menu.classList.contains("est-ouvert")) {
    fermerMenu(true);
  }
});
