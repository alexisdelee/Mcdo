import { Component, OnInit } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ActivatedRoute } from "@angular/router";


import { Globals } from "../Globals";
import { Product } from "../../models/Product";


@Component({
  selector: "app-product",
  templateUrl: "./product.component.html",
  styleUrls: [ "./product.component.css" ],
  providers: [ Globals ]
})

export class ProductComponent implements OnInit {

  product: Product;

  constructor(
    private globals: Globals,
    private http: HttpClient,
    private url: ActivatedRoute) { }

  ngOnInit() {
    const id = this.url.snapshot.paramMap.get("id");
    this.getProductById(id);
  }

  getProductById(id: string): void {
    console.log(id);
    this
      .http
      .get(this.globals.resolveAPIAddress("/products/" + id))
      .subscribe(
        (product: any) => this.product = product.items,
        (err: any) => console.error(err)
      );

    setTimeout(() => console.log(this.product), 2000);
  }

}
