import { NgModule} from "@angular/core";
import { Routes, Router, RouterModule } from "@angular/router";
import { Location } from "@angular/common";


import { Route } from "./views/Route";


@NgModule({
  imports: [ RouterModule.forRoot(Route.routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {

  constructor(
    private router: Router,
    private location: Location
  ) { }

}
