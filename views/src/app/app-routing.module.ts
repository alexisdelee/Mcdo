import { NgModule} from "@angular/core";
import { Routes, Router, RouterModule } from "@angular/router";
import { Location } from "@angular/common";


import { HomeComponent } from "./views/home/home.component";
import { UserComponent } from "./views/user/user.component";
import { AdminComponent } from "./views/admin/admin.component";
import { LoginComponent } from "./views/login/login.component";
import { ProductComponent } from "./views/product/product.component";


const routes: Routes = [
  {
    path: "",
    component: HomeComponent
  },
  {
    path: "user",
    component: UserComponent
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
    path: "products/:id",
    component: ProductComponent
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
