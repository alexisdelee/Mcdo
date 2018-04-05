import { Component, OnInit } from "@angular/core";
import { Location } from "@angular/common";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from "@angular/router";


import { Globals } from "../Globals";
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

  constructor(
    private globals: Globals,
    private http: HttpClient,
    private router: Router,
    private location: Location,
    private dialog: DialogService) {
    this.appRouting = new AppRoutingModule(router, location);
  }

  ngOnInit() {
    this.getPopularProducts();
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
    this.router.navigate(["products/" + e.target.closest("mat-card").dataset.id]);
  }

}
