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

```shell
/ingredients
/products
/products/populars
/groups
/groups/products
/menus
```

## Models

Les models sont les suivants :  
 - [Ingredient](models/Ingredient.js)  
 - [Product](models/Product.js)  
 - [Group](models/Group.js)  
 - [Menu](models/Menu.js)  
 - [User](models/User.js)  

## Environnement

### MongoDB

Port par défaut : 27017 (webconfig.json#8:5)  
Localisation : webconfig.json#10:5  

```shell
# launch server
npm run tools launch:database
# or
npm run tools database:launch
```

```shell
# export
npm run tools database:export
  
# import
npm run tools database:import
```

### API Node.js

Port par défaut : 3000 (webconfig.json#4:5)  

```shell
npm run tools launch:server
```

### Angular 5

La vue sera faite en utilisant Angular 5 et Angular Material.  
Port par défaut : 4200 (webconfig.json#13:5)  
Localisation : webconfig.json#14:5  

```shell
# lancer le serveur interne
npm run tools launch:client
```

### Tests unitaires

Les tests unitaires seront exécutés avec Jest.  

```shell
npm run tools test
```

## Installation

```shell
# developement environment
npm install --only=dev
# production environment
npm install --only=prod

npm run tools database:launch
npm run tools database:import

npm run tools launch:server

npm run tools launch:client
```
