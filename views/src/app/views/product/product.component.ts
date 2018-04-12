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
  isOrdered: boolean;

  @Input() product: Product;

  constructor(
    private router: Router,
    private url: ActivatedRoute,
    private order: OrderService) {
    this.isOrdered = false;
  }

  ngOnInit() { }

  // debug
  manageProduct() {
    if (this.isOrdered) {
      this.order.cancelProduct(this.product);
    } else {
      this.order.orderProduct(this.product);
    }

    this.isOrdered = !this.isOrdered;
  }
  // debug

  redirectToGroup(e): void {
    this.router.navigate([ "groups/" + e.value ]);
  }

}
