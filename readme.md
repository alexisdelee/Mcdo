# Sommaire

- [API](#api)  
- [Models](#models)  
- [Environnement](#environnement)  
- [Installation](#installation)

## API

### Route pour la gestion des ingrédients :

|  Accès  | Méthode |            Route            |                         Explication                         |
|:-------:|:-------:|:---------------------------:|:-----------------------------------------------------------:|
| public  | GET     | /ingredients                | Obtenir tous les ingrédients.                               |
| public  | GET     | /ingredients/:id            | Obtenir un ingredient.                                      |
| private | POST    | /ingredients                | Ajouter un nouvel ingrédient.                               |
| private | PUT     | /ingredients/:id            | Modifier un ingrédient.                                     |
| private | PUT     | /ingredients/:id/:attribute | Modifier un attribut spécifique d'un ingrédient.            |
| private | DELETE  | /ingredients/:id            | Supprimer un ingrédient.                                    |

### Route pour la gestion des produits :

|  Accès  | Méthode |           Route          |                        Explication                        |
|:-------:|:-------:|:------------------------:|:---------------------------------------------------------:|
| public  | GET     | /products                | Obtenir tous les produits.                                |
| public  | GET     | /products/:id            | Obtenir un produit.                                       |
| private | POST    | /products                | Ajouter un nouveau produit.                               |
| private | PUT     | /products/:id            | Modifier un produit.                                      |
| private | PUT     | /products/:id/:attribute | Modifier un attribut spécifique d'un produit.             |
| private | DELETE  | /products/:id            | Supprimer un produit                                      |

### Route pour la gestion des groupes :

|  Accès  | Méthode |          Route         |                        Explication                       |
|:-------:|:-------:|:----------------------:|:--------------------------------------------------------:|
| public  | GET     | /groups                | Obtenir tous les groupes.                                |
| public  | GET     | /groups/:id            | Obtenir un groupe.                                       |
| public  | GET     | /groups/products       | Obtenir tous les produits en relation à leurs groupes.   |
| public  | GET     | /groups/products/:id   | Obtenir tous les produits en relation à ce groupe.       |
| private | POST    | /groups                | Ajouter un nouveau groupe.                               |
| private | PUT     | /groups/:id            | Modifier un groupe.                                      |
| private | PUT     | /groups/:id/:attribute | Modifier un attribut spécifique d'un groupe.             |
| private | DELETE  | /groups/:id            | Supprimer un groupe                                      |

### Route pour la gestion des menus

|  Accès  | Méthode |         Route         |                 Explication                |
|:-------:|:-------:|:---------------------:|:------------------------------------------:|
| public  | GET     | /menus                | Obtenir tous les menus.                    |
| public  | GET     | /menus/:id            | Obtenir un menu.                           |
| private | POST    | /menus                | Ajouter un nouveau menu.                   |
| private | PUT     | /menus/:id            | Modifier un menu.                          |
| private | PUT     | /menus/:id/:attribute | Modifier un attribut spécifique d'un menu. |
| private | DELETE  | /menus/:id            | Supprimer un menu                          |

### Route pour la gestion des utilisateurs (_en cours_)

|  Accès  | Méthode |        Route       |                Explication               |
|:-------:|:-------:|:------------------:|:----------------------------------------:|
| public  | GET     | /users/permissions | Obtenir les permission d'un utilisateur. |
| private | POST    | /users             | Ajouter un utilisateur.                  |
| private | DELETE  | /users/:id         | Modifier un utilisateur.                 |

## Models

Les models sont les suivants :  
 - [Ingredient](models/Ingredient.js)  
 - [Product](models/Product.js)  
 - [Group](models/Group.js)  
 - [Menu](models/Menu.js)  
 - User (_en cours_)

## Environnement

### MongoDB

Port par défaut : 27017 (possibilité de le changer dans le fichier [index.js](index.js))  
Localisation : [db/](db/)

```shell
# export
mongodump --out export/
  
# import
mongorestore export/
```

### Angular 5

La vue sera faite en utilisant Angular 5 et Angular Material.  
Port par défaut : 4200 (possibilité de le changer avec la commande ``ng serve --open --port 4401``)  
Localisation : [views/](views/)

```shell
# lancer le serveur interne
ng serve --open
```

### API Node.js

Port par défaut : 3000 (possibilité de le changer dans le fichier [index.js](index.js))  
Localisation : [index.js](index.js)

```shell
node index.js
```

## Installation

```shell
npm install
mongod --dbpath db
mongorestore export/
node index.js
  
# pour la vue
npm install -g @angular/cli
cd views && npm install
ng serve --open
```
