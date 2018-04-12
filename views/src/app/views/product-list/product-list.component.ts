import { Component, OnInit } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ActivatedRoute } from "@angular/router";


import { Globals } from "../Globals";
import { Product } from "../../models/Product";


@Component({
  selector: "app-product-list",
  templateUrl: "./product-list.component.html",
  styleUrls: [ "./product-list.component.css" ],
  providers: [ Globals ]
})

export class ProductListComponent implements OnInit {

  products: Product[];

  constructor(
    private globals: Globals,
    private http: HttpClient,
    private url: ActivatedRoute) {
    this.products = [];
  }

  ngOnInit() {
    const id = this.url.snapshot.paramMap.get("id");
    if (id) {
      this.getProductById(id);
    } else {
      this.getProducts();
    }
  }

  getProductById(id: string): void {
    this
      .http
      .get(this.globals.resolveAPIAddress("/products/" + id))
      .subscribe(
        (product: any) => this.products = [ product.items ],
        (err: any) => console.error(err)
      );
  }

  getProducts(): void {
    this
      .http
      .get(this.globals.resolveAPIAddress("/products"))
      .subscribe(
        (product: any) => this.products = product.items,
        (err: any) => console.error(err)
      );
  }

}
