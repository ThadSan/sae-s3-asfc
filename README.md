# SAE S3 – Refonte du système d'information de l'ASFC

## Présentation
Projet réalisé dans le cadre de la SAE S3 (BUT2 Informatique)
L'objectif est d'accompagner l'association **ASFC**, partenaire du réseau
France Asso Santé, dans l'analyse et la refonte de son système d'information
(audit d'accessibilité, refonte Front-End, modélisation des données, API,
Back-End et valorisation des données)

## Équipe
| Nom | Prénom | Groupe TD |
|---|---|---|
| Thanam | Thadsan | 209 |
| Al-Charani | Noel | 206 |
| Chabrillanges | Clément | 206 |
| Hamzaoui | Derar | 206 |
| Mohamed | Rayan | 206 |

## Organisation du projet
- Gestion de projet : [GitHub Projects](https://github.com/users/ThadSan/projects/4)
- Méthode : Kanban, points d'équipe réguliers
- Association étudiée : [ASFC](https://www.asso-sfc.org/)
- Site en ligne (GitHub Pages) : [thadsan.github.io/sae-s3-asfc](https://thadsan.github.io/sae-s3-asfc/)

## Missions et échéances
| Mission | Objet | Échéance |
|---|---|---|
| 0 | Organisation des équipes | 20/09/2026 |
| 1 | Découverte & audit accessibilité | Semaine du 29/09/2026 |
| 2 | Refonte Front-End | Semaine du 09/11/2026 |
| 3 | Analyse métier & modélisation | Semaine du 19/10/2026 |
| 4 | Développement Back-End | Semaine du 04/01/2027 |
| 5 | Exploitation & visualisation des données | Rapport final |

## Stack technique
- Front-End : HTML / CSS / JavaScript
- Back-End : PHP + MySQL/PostgreSQL, API REST
- Visualisation : JavaScript ou Power BI

## Site (Mission 2 – Refonte Front-End)
Prototype Front-End du nouveau site de l'ASFC, écrit à la main en HTML, CSS et JavaScript
à partir des conclusions de l'audit d'accessibilité de la mission 1 :
mise en page responsive, contrastes corrigés, champs de formulaire reliés à leur
`label`, liens explicites, hiérarchie des titres, animations douces désactivées si
le visiteur demande de réduire les animations

Le site est en ligne ici : https://thadsan.github.io/sae-s3-asfc/

### Structure du dépôt
- `index.html` : page d'accueil
- `pages/` : les autres pages (la maladie, contact, adhérer)
- `css/commun.css` : variables, typographie et boutons communs à toutes les pages
- `css/navbar-footer.css` : barre de navigation et pied de page
- `css/accueil.css`, `css/maladie.css`, `css/contact-adherer.css` : un fichier par page
- `js/navbar.js` : navigation et menu mobile
- `js/accueil.js` : animations de l'accueil
- `js/maladie.js` : sommaire et sections dépliables de la page maladie
- `js/formulaire.js` : vérification des formulaires contact et adhérer
- `img/` : logo et images

### Voir le site en local
Ouvrir le dossier dans VS Code ou VSCodium puis lancer `index.html` avec l'extension Live Server

## Workflow Git
- `main` est la branche stable : on ne pousse pas dessus directement
- une branche par tâche (`page-acceuil`, `page-maladie`, `navbar-footer`, `page-contact-adherer`...), puis Pull Request relue par un coéquipier
- le site GitHub Pages se met à jour automatiquement à chaque modification de `main`