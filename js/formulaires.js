// Vérification du formulaire de contact (prendre en compte que c pas un envoie reel car pas encore de backend
const form = document.getElementById("form-contact");

if (form) {
  const retour = form.querySelector(".message-retour");

  const regles = {
    nom:          champ => champ.value.trim() === "" ? "Indiquez votre nom et prénom." : "",
    email:        champ => champ.value.trim() === "" ? "Indiquez votre adresse email."
        : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(champ.value.trim()) ? "L'adresse email n'est pas valide (exemple : nom@mail.fr)." : "",
    sujet:        champ => champ.value === "" ? "Choisissez un sujet." : "",
    message: champ => champ.value.trim() === "" ? "Écrivez votre message."
        : champ.value.trim().length < 10 ? "Votre message doit faire au moins 10 caractères." : "",
    consentement: champ => !champ.checked ? "Vous devez accepter pour envoyer le message." : ""
  };

  function verifier(id) {
    const champ = document.getElementById(id);
    const erreur = document.getElementById("erreur-" + id);
    const texte = regles[id](champ);
    erreur.textContent = texte;
    champ.setAttribute("aria-invalid", texte ? "true" : "false");
    return texte === "";
  }

  // ca permet de vérifier un champ quand on le quitte
  Object.keys(regles).forEach(id => {
    document.getElementById(id).addEventListener("blur", () => verifier(id));
  });

  form.addEventListener("submit", event => {
    event.preventDefault();
    const resultats = Object.keys(regles).map(verifier);
    const premierFaux = Object.keys(regles).find((id, i) => !resultats[i]);

    if (premierFaux) {
      retour.textContent = "";
      document.getElementById(premierFaux).focus(); // ca permet d'amener l'utilisateur sur la 1re erreur
      return;
    }

    retour.textContent = "Merci, votre message a bien été préparé.(ceci est une demonstration)";
    form.reset();
    Object.keys(regles).forEach(id => document.getElementById(id).removeAttribute("aria-invalid"));
  });
}