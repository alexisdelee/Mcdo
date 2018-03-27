# Sommaire

- [API](#api)  
- [Models](#models)  
- [Environnement](#environnement)  
- [Installation](#installation)

## API

### Routes pour la gestion des ingrédients :

|  Accès  | Méthode |            Route            |                         Explication                         |
|:-------:|:-------:|:---------------------------:|:-----------------------------------------------------------:|
| public  | GET     | /ingredients                | Obtenir tous les ingrédients.                               |
| public  | GET     | /ingredients/:id            | Obtenir un ingredient.                                      |
| private | POST    | /ingredients/new            | Ajouter un nouvel ingrédient.                               |
| private | PUT     | /ingredients/:id            | Modifier un ingrédient.                                     |
| private | PUT     | /ingredients/:id/:attribute | Modifier un attribut spécifique d'un ingrédient.            |
| private | DELETE  | /ingredients/:id            | Supprimer un ingrédient.                                    |

### Routes pour la gestion des produits :

|  Accès  | Méthode |           Route          |                        Explication                        |
|:-------:|:-------:|:------------------------:|:---------------------------------------------------------:|
| public  | GET     | /products                | Obtenir tous les produits.                                |
| public  | GET     | /products/:id            | Obtenir un produit.                                       |
| public  | GET     | /products/populars       | Obtenir tous les produits populaires (mise en avant).     |
| public  | GET     | /products/populars/:id   | Obtenir un produit populaire.                             |
| private | POST    | /products/new            | Ajouter un nouveau produit.                               |
| private | PUT     | /products/:id            | Modifier un produit.                                      |
| private | PUT     | /products/:id/:attribute | Modifier un attribut spécifique d'un produit.             |
| private | DELETE  | /products/:id            | Supprimer un produit                                      |

### Routes pour la gestion des groupes :

|  Accès  | Méthode |          Route         |                        Explication                       |
|:-------:|:-------:|:----------------------:|:--------------------------------------------------------:|
| public  | GET     | /groups                | Obtenir tous les groupes.                                |
| public  | GET     | /groups/:id            | Obtenir un groupe.                                       |
| public  | GET     | /groups/products       | Obtenir tous les produits en relation à leurs groupes.   |
| public  | GET     | /groups/products/:id   | Obtenir tous les produits en relation à ce groupe.       |
| private | POST    | /groups/new            | Ajouter un nouveau groupe.                               |
| private | PUT     | /groups/:id            | Modifier un groupe.                                      |
| private | PUT     | /groups/:id/:attribute | Modifier un attribut spécifique d'un groupe.             |
| private | DELETE  | /groups/:id            | Supprimer un groupe                                      |

### Routes pour la gestion des menus

|  Accès  | Méthode |         Route         |                 Explication                |
|:-------:|:-------:|:---------------------:|:------------------------------------------:|
| public  | GET     | /menus                | Obtenir tous les menus.                    |
| public  | GET     | /menus/:id            | Obtenir un menu.                           |
| private | POST    | /menus/new            | Ajouter un nouveau menu.                   |
| private | PUT     | /menus/:id            | Modifier un menu.                          |
| private | PUT     | /menus/:id/:attribute | Modifier un attribut spécifique d'un menu. |
| private | DELETE  | /menus/:id            | Supprimer un menu                          |

### Routes pour la gestion des utilisateurs

|  Accès  | Méthode |            Route           |            Explication          |
|:-------:|:-------:|:--------------------------:|:-------------------------------:|
| public  | POST    | /users/token/authorization | Obtenir un token.               |
| public  | POST    | /users/token/verify        | Vérifier la validité d'un token |


Les queries ``limit`` et ``offset`` sont étendues sur les méthodes __getAll__ et __getProducts__.

## Models

Les models sont les suivants :  
 - [Ingredient](models/Ingredient.js)  
 - [Product](models/Product.js)  
 - [Group](models/Group.js)  
 - [Menu](models/Menu.js)  
 - User (models/User.js)

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
