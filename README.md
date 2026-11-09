# SAE S3 – Refonte du système d'information de l'ASFC

## Présentation
Projet réalisé dans le cadre de la SAE S3 (BUT2 Informatique).
L'objectif est d'accompagner l'association **ASFC**, partenaire du réseau
France Asso Santé, dans l'analyse et la refonte de son système d'information
(audit d'accessibilité, refonte Front-End, modélisation des données, API,
Back-End et valorisation des données).

## Équipe
| Nom | Prénom | Groupe TD |
|---|---|---|
| Thanam | Thadsan | 206 |
| Al-Charani | Noel | 206 |
| Chabrillanges | Clément | 206 |
| Hamzaoui | Derar | 206 |
| Mohamed | Rayan | 206 |

## Organisation du projet
- Gestion de projet : GitHub Projects → [https://github.com/users/ThadSan/projects/4]
- Méthode : Kanban, points d'équipe réguliers
- Association étudiée : [ASFC](https://www.asso-sfc.org/)

## Missions et échéances
| Mission | Objet | Échéance |
|---|---|---|
| 0 | Organisation des équipes | 20/09/2026 |
| 1 | Découverte & audit accessibilité | Semaine du 29/09/2026 |
| 2 | Refonte Front-End | Semaine du 09/11/2026 |
| 3 | Analyse métier & modélisation | Semaine du 19/10/2026 |
| 4 | Développement Back-End | Semaine du 04/01/2026 |
| 5 | Exploitation & visualisation des données | Rapport final |

## Stack technique
- Front-End : HTML / CSS / JavaScript
- Back-End : PHP + MySQL/PostgreSQL, API REST
- Visualisation : JavaScript ou Power BI

## Site (Mission 2 – Refonte Front-End)
Copie statique du site https://www.asso-sfc.org, reprise dans un cadre scolaire.

- `src/` : tout le site. `src/index.html` et `src/*.html` : pages du site (renommées depuis `.php`)
- `src/css/style.css` : feuille de style d'origine (à découper en plusieurs fichiers)
- `src/images/`, `src/js/`, `src/photos/` : ressources
- `documents/` (PDF) : non versionné

Ouvrir `src/index.html` dans le navigateur pour voir le site.

## Workflow Git
- `main` est protégée : on ne pousse pas dessus directement.
- Une branche par tâche (`feature/...`, `fix/...`), puis Pull Request relue par un coéquipier.
