import { Component, OnInit } from "@angular/core";


import { OrderService } from "../../services/order/order.service";
import { Product } from "../../models/Product";


@Component({
  selector: "app-order",
  templateUrl: "./order.component.html",
  styleUrls: [ "./order.component.css" ]
})

export class OrderComponent implements OnInit {

  products: Product[];

  constructor(private order: OrderService) {
    this.products = [];
  }

  ngOnInit() {
    this.order.currentOrder.subscribe(product => {
      if (product && this.products.includes(product) == false) {
        this.products.push(product);
      }
    });

    this.order.currentCancel.subscribe(product => {
      if (product && this.products.includes(product)) {
        this.products.splice(this.products.indexOf(product), 1);
      }
    });
  }

}
