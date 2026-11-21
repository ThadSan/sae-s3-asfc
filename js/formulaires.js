/* Validation des formulaires Contact, Adhérer et Connexion.
   Principe : chaque champ à contrôler porte data-regle="requis email tel cp ..." ;
   les messages s'affichent sous le champ (aria-describedby) + un résumé en haut (role="alert"). */
(function () {
  'use strict';

  var REGLES = {
    requis: function (v, c) {
      if (c.type === 'checkbox') return c.checked;
      return v.trim() !== '';
    },
    email: function (v) { return v === '' || /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v); },
    tel: function (v) { return v === '' || /^(?:(?:\+|00)33|0)\s?[1-9](?:[\s.-]?\d{2}){4}$/.test(v.trim()); },
    cp: function (v) { return v === '' || /^\d{5}$/.test(v.trim()); },
    nom: function (v) { return v === '' || /^[A-Za-zÀ-ÿ' -]{2,}$/.test(v.trim()); },
    majeur: function (v) {
      if (v === '') return true;
      var d = new Date(v), auj = new Date();
      if (isNaN(d)) return false;
      var age = auj.getFullYear() - d.getFullYear();
      var m = auj.getMonth() - d.getMonth();
      if (m < 0 || (m === 0 && auj.getDate() < d.getDate())) age--;
      return age >= 18 && age < 120;
    },
    min10: function (v) { return v.trim().length >= 10; },
    mdp8: function (v) { return v === '' || v.length >= 8; }
  };

  var MESSAGES = {
    requis: 'ce champ est obligatoire.',
    email: 'saisissez une adresse e-mail valide (exemple : nom@domaine.fr).',
    tel: 'saisissez un numéro français valide (exemple : 06 12 34 56 78).',
    cp: 'le code postal doit contenir 5 chiffres.',
    nom: 'utilisez uniquement des lettres, espaces, apostrophes ou tirets (2 caractères minimum).',
    majeur: 'vous devez avoir au moins 18 ans pour adhérer.',
    min10: 'votre message doit contenir au moins 10 caractères.',
    mdp8: 'le mot de passe doit contenir au moins 8 caractères.'
  };

  function groupe(form, champ) {
    // pour les boutons radio : tous ceux du même name
    if (champ.type === 'radio') return form.querySelectorAll('input[type=radio][name="' + champ.name + '"]');
    return [champ];
  }

  function valeurChamp(form, champ) {
    if (champ.type === 'radio') {
      var coche = form.querySelector('input[type=radio][name="' + champ.name + '"]:checked');
      return coche ? coche.value : '';
    }
    return champ.value;
  }

  function verifier(form, champ) {
    var regles = (champ.getAttribute('data-regle') || '').split(/\s+/).filter(Boolean);
    for (var i = 0; i < regles.length; i++) {
      var r = regles[i];
      if (!REGLES[r]) continue;
      var v = valeurChamp(form, champ);
      var ok = REGLES[r](v, champ);
      if (!ok) return r;
    }
    return null;
  }

  function afficher(form, champ, regle) {
    var zone = document.getElementById(champ.getAttribute('data-erreur'));
    var cibles = groupe(form, champ);
    var etiquette = champ.getAttribute('data-nom') || champ.name;
    Array.prototype.forEach.call(cibles, function (c) {
      if (regle) c.setAttribute('aria-invalid', 'true'); else c.removeAttribute('aria-invalid');
    });
    if (zone) zone.textContent = regle ? MESSAGES[regle].charAt(0).toUpperCase() + MESSAGES[regle].slice(1) : '';
    // le préfixe CSS « Erreur : » est visuel ; le texte contient déjà le nom du champ
  }

  function initFormulaire(form) {
    var resume = form.querySelector('.resume-erreurs');
    var confirmation = form.parentNode.querySelector('.confirmation');
    var champs = form.querySelectorAll('[data-regle]');
    var vus = {};
    var uniques = Array.prototype.filter.call(champs, function (c) {
      var cle = c.type === 'radio' ? 'r_' + c.name : c.id;
      if (vus[cle]) return false;
      vus[cle] = true;
      return true;
    });

    // validation à la sortie du champ (blur) puis à chaque saisie une fois l'erreur affichée
    uniques.forEach(function (champ) {
      Array.prototype.forEach.call(groupe(form, champ), brancher);
      function brancher(c) {
        c.addEventListener('blur', function () { afficher(form, champ, verifier(form, champ)); });
        c.addEventListener('input', function () {
          if (c.getAttribute('aria-invalid') === 'true') afficher(form, champ, verifier(form, champ));
        });
        c.addEventListener('change', function () {
          if (c.type === 'radio' || c.type === 'checkbox' || c.tagName === 'SELECT') afficher(form, champ, verifier(form, champ));
        });
      }
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var erreurs = [];
      uniques.forEach(function (champ) {
        var r = verifier(form, champ);
        afficher(form, champ, r);
        if (r) erreurs.push({ champ: champ, regle: r });
      });

      if (confirmation) confirmation.hidden = true;

      if (erreurs.length) {
        if (resume) {
          var liste = resume.querySelector('ul');
          liste.innerHTML = '';
          erreurs.forEach(function (er) {
            var li = document.createElement('li');
            var a = document.createElement('a');
            a.href = '#' + er.champ.id;
            a.textContent = (er.champ.getAttribute('data-nom') || er.champ.name) + ' : ' + MESSAGES[er.regle];
            a.addEventListener('click', function (ev) { ev.preventDefault(); er.champ.focus(); });
            li.appendChild(a);
            liste.appendChild(li);
          });
          resume.hidden = false;
          resume.focus();
        }
        return;
      }

      if (resume) resume.hidden = true;
      // Pas de back-end dans la SAÉ : on simule l'envoi.
      form.reset();
      if (confirmation) {
        confirmation.hidden = false;
        confirmation.focus();
      }
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    Array.prototype.forEach.call(document.querySelectorAll('form[data-validation]'), initFormulaire);
  });
})();
