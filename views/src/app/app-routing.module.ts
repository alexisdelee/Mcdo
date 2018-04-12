import { NgModule} from "@angular/core";
import { Routes, Router, RouterModule } from "@angular/router";
import { Location } from "@angular/common";


import { HomeComponent } from "./views/home/home.component";
import { AdminComponent } from "./views/admin/admin.component";
import { LoginComponent } from "./views/login/login.component";
import { ProductListComponent } from "./views/product-list/product-list.component";
import { GroupListComponent } from "./views/group-list/group-list.component";
import { MenuListComponent } from "./views/menu-list/menu-list.component";
import { UserComponent } from "./views/user/user.component";


const routes: Routes = [
  {
    path: "",
    component: HomeComponent
  },
  {
    path: "admin",
    component: AdminComponent
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "products",
    component: ProductListComponent
  },
  {
    path: "products/:id",
    component: ProductListComponent
  },
  {
    path: "groups",
    component: GroupListComponent
  },
  {
    path: "groups/:id",
    component: GroupListComponent
  },
  {
    path: "menus",
    component: MenuListComponent
  },
  {
    path: "menus/:id",
    component: MenuListComponent
  },
  {
    path: "user",
    component: UserComponent
  },
  {
    path: "**",
    component: HomeComponent
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {

  constructor(
    private router: Router,
    private location: Location
  ) { }

}
