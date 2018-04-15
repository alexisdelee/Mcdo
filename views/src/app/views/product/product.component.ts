import { Component, OnInit, Input } from "@angular/core";
import { Router } from "@angular/router";
import { ActivatedRoute } from "@angular/router";


import { OrderService } from "../../services/order/order.service";
import { Product } from "../../models/Product";


@Component({
  selector: "app-product",
  templateUrl: "./product.component.html",
  styleUrls: [ "./product.component.css" ]
})

export class ProductComponent implements OnInit {

  currentProduct: Product;

  @Input() product: Product;
  @Input() isMenu: boolean;

  constructor(
    private router: Router,
    private url: ActivatedRoute,
    private order: OrderService) { }

  ngOnInit() { }

  manageProduct() {
    this.order.orderProduct(this.product);
  }

  redirectToGroup(e): void {
    this.router.navigate([ "groups/" + e.value ]);
  }

}
