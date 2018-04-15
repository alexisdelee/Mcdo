import { Routes } from "@angular/router";


import { HomeComponent } from "./home/home.component";
import { AdminComponent } from "./admin/admin.component";
import { LoginComponent } from "./login/login.component";
import { ProductListComponent } from "./product-list/product-list.component";
import { GroupListComponent } from "./group-list/group-list.component";
import { MenuListComponent } from "./menu-list/menu-list.component";
import { UserComponent } from "./user/user.component";


export class Route {

  static routes: Routes = [
    {
      path: "",
      component: HomeComponent,
      data: { _name: "#", _dependencies: [] }
    },
    {
      path: "admin",
      component: AdminComponent,
      data: { _name: "Panel d'administration", _dependencies: [ "" ] }
    },
    {
      path: "login",
      component: LoginComponent,
      data: { _name: "Connexion", _dependencies: [ "" ] }
    },
    {
      path: "products",
      component: ProductListComponent,
      data: { _name: "Produits", _dependencies: [ "", "user" ] }
    },
    {
      path: "products/:id",
      component: ProductListComponent,
      data: { _name: "...", _dependencies: [ "", "user", "products" ] }
    },
    {
      path: "groups",
      component: GroupListComponent,
      data: { _name: "Groupes", _dependencies: [ "", "user" ] }
    },
    {
      path: "groups/:id",
      component: GroupListComponent,
      data: { _name: "...", _dependencies: [ "", "user", "groups" ] }
    },
    {
      path: "menus",
      component: MenuListComponent,
      data: { _name: "Menus", _dependencies: [ "", "user" ] }
    },
    {
      path: "menus/:id",
      component: MenuListComponent,
      data: { _name: "...", _dependencies: [ "", "user", "menus" ] }
    },
    {
      path: "user",
      component: UserComponent,
      data: { _name: "Accueil", _dependencies: [ "" ] }
    },
    {
      path: "**",
      // component: HomeComponent
      redirectTo: ""
    }
  ];

}
