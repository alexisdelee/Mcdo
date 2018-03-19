import { NgModule} from "@angular/core";
import { Routes, Router, RouterModule } from "@angular/router";
import { Location } from "@angular/common";


import { HomeComponent } from "./views/home/home.component";
import { UserComponent } from "./views/user/user.component";


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
