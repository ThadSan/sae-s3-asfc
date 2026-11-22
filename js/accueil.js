// accueil.js : animations douces de la page d'accueil
// tout est coupé si le visiteur a demandé de réduire les animations
// (la classe "animations" est posée sur <html> par le script du <head>)

if (document.documentElement.classList.contains('animations')) {
    animerHero();
    animerAuScroll();
}

/* ---------- 1. hero : badge, titre écrit, paragraphe, boutons ---------- */
function animerHero() {
    const titre = document.querySelector('#titre-hero');
    const badge = document.querySelector('.hero .badge');
    const chapeau = document.querySelector('.hero .chapeau');
    const boutons = document.querySelector('.hero-texte .actions');
    const raccourcis = document.querySelector('.hero-raccourcis');

    // on garde le vrai texte pour les lecteurs d'écran
    // et on écrit une copie cachée aux lecteurs d'écran (aria-hidden)
    const texte = titre.textContent.trim();
    titre.textContent = '';

    const pourLecteurs = document.createElement('span');
    pourLecteurs.className = 'visuellement-cache';
    pourLecteurs.textContent = texte;

    const copie = document.createElement('span');
    copie.setAttribute('aria-hidden', 'true');
    const tape = document.createElement('span');
    tape.className = 'tape';
    const reste = document.createElement('span');
    reste.className = 'reste';      // texte pas encore écrit : invisible mais il garde sa place
    reste.textContent = texte;

    copie.append(tape, reste);
    titre.append(pourLecteurs, copie);
    titre.classList.add('ecriture');

    function afficher(element) {
        element.classList.add('visible');
    }

    function ecrire() {
        let i = 0;
        const minuteur = setInterval(function () {
            i++;
            tape.textContent = texte.slice(0, i);
            reste.textContent = texte.slice(i);
            if (i >= texte.length) {
                clearInterval(minuteur);
                titre.classList.remove('ecriture');     // le curseur disparaît
                setTimeout(function () { afficher(chapeau); }, 150);
                setTimeout(function () { afficher(boutons); }, 450);
                setTimeout(function () { afficher(raccourcis); }, 700);
            }
        }, 50);
    }

    afficher(badge);
    setTimeout(ecrire, 350);
}

/* ---------- 2. apparition des sections quand on descend ---------- */
function animerAuScroll() {
    const selecteurs = [
        '.bande > .interieur > h2', '.entete-section',
        '.liste-bref li', '.cartes-aide li', '.liste-actus li', '.action',
        '.titre-ressources', '.ressources li',
        '.asfc-texte h2', '.asfc-texte p', '.missions h3', '.missions li',
        '.soutien h2', '.soutien p', '.soutien .actions'
    ];
    const cibles = document.querySelectorAll(selecteurs.join(', '));
    // ces éléments ont leur propre effet (surlignage, missions qui flottent)
    const speciaux = document.querySelectorAll('.souligne, .missions');

    // vieux navigateur : on laisse tout visible
    if (!('IntersectionObserver' in window)) {
        speciaux.forEach(function (el) { el.classList.add('visible'); });
        return;
    }

    cibles.forEach(function (el) {
        // petit décalage selon la position dans la liste, 5 rangs maximum
        const rang = Array.from(el.parentElement.children).indexOf(el);
        el.classList.add('reveal');
        el.style.transitionDelay = Math.min(rang, 5) * 80 + 'ms';
    });

    // une fois apparu, on retire "reveal" pour ne pas retarder les effets au survol
    function liberer(el) {
        el.addEventListener('transitionend', function fin(e) {
            if (e.target !== el) return;
            el.classList.remove('reveal');
            el.style.transitionDelay = '';
            el.removeEventListener('transitionend', fin);
        });
    }

    const observateur = new IntersectionObserver(function (entrees) {
        entrees.forEach(function (entree) {
            if (!entree.isIntersecting) return;
            const el = entree.target;
            el.classList.add('visible');
            observateur.unobserve(el);
            if (el.classList.contains('reveal')) liberer(el);
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -8% 0px' });

    cibles.forEach(function (el) { observateur.observe(el); });
    speciaux.forEach(function (el) { observateur.observe(el); });
}