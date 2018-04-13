import { Component, OnInit } from "@angular/core";
import { Location } from "@angular/common";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { NavigationEnd, Router, ActivatedRoute } from "@angular/router";


import { Globals } from "../Globals";
import { Route } from "../Route";
import { DialogService } from "../../services/dialog/dialog.service";
import { AppRoutingModule } from "../../app-routing.module";
import { Product } from "../../models/Product";


@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: [ "./header.component.css" ],
  providers: [ Globals ]
})

export class HeaderComponent implements OnInit {

  appRouting: AppRoutingModule;
  popularProducts: Product[];
  navigation: any[];
  currentComponentName: string;
  $id: string;

  constructor(
    private globals: Globals,
    private http: HttpClient,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private dialog: DialogService) {
    this.appRouting = new AppRoutingModule(router, location);

    this.navigation = [];
    this.currentComponentName = "";
  }

  ngOnInit() {
    this.router.events.subscribe(e => {
      if (e instanceof NavigationEnd) {
        this.detectCurrentComponent(this.activatedRoute.firstChild.component["name"]);
      }
    });

    this.getPopularProducts();
  }

  detectCurrentComponent(componentName: string): void {
    const dependencies = {};

    this.router.config.forEach(component => {
      dependencies[component.path] = component;
    });

    Route.routes.forEach(route => {
      dependencies[route.path] = route;

      if (route.path === "**") {
        // do something
      } else {
        const patternURLComponent = "^/?" + route.path.replace(/:id$/, "[a-z0-9]{24}") + "$";

        if (route.component.name === componentName) {
          // if (this.location.path().match(new RegExp(patternURLComponent))) {
          if ((new RegExp(patternURLComponent).test(this.location.path()))) {
            this.$id = route.data._name;
            this.currentComponentName = route.data._name;

            this.navigation = dependencies[route.path].data._dependencies.map(dependency => {
              return dependencies[dependency];
            });
          }
        }
      }
    });
  }

  getPopularProducts(): void {
    this
      .http
      .get(this.globals.resolveAPIAddress("/products/populars"))
      .subscribe(
        (products: any) => this.popularProducts = products.items,
        (err: any) => this.dialog.show(JSON.stringify(err))
      )
  }

  redirectToProduct(e): void {
    this.router.navigate([ "products/" + e.target.closest("mat-card").dataset.id ]);
  }

}
