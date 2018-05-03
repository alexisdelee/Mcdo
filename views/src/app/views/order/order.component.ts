import { Component, OnInit } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from "@angular/router";
import { MatTableDataSource } from "@angular/material";


import { Globals } from "../Globals";
import { OrderService } from "../../services/order/order.service";
import { DialogService } from "../../services/dialog/dialog.service";
import { Basket } from "../../models/Basket";
import { Order } from "../../models/Order";
import { Product } from "../../models/Product";
import { Menu } from "../../models/Menu";


@Component({
  selector: "app-order",
  templateUrl: "./order.component.html",
  styleUrls: [ "./order.component.css" ],
  providers: [ Globals ]
})

export class OrderComponent implements OnInit {

  products: Product[] = [];
  basket: Basket[];
  dataSource: any;
  total: number;

  constructor(
    private http: HttpClient,
    private order: OrderService,
    private router: Router,
    private globals: Globals,
    private dialog: DialogService) { }

  ngOnInit() {
    this.order.currentOrder.subscribe((basket: Basket[]) => this.updateNewProduct(basket));
    this.order.currentCancel.subscribe((basket: Basket[]) => this.updateRemoveProduct(basket));

    this.basket = this.order.initBasket();

    this.total = 0;
    this.updateTotal();
    this.dataSource = new MatTableDataSource<any>(this.basket);
  }

  updateNewProduct(basket: Basket[]): void {
    if (basket) {
      this.basket = basket;

      this.updateTotal(); // update total price
      this.dataSource = new MatTableDataSource<any>(this.basket); // update table
    }
  }

  updateTotal(): void {
    this.total = this.basket.reduce((acc: number, item: Basket) => {
      if(item.product) {
        acc += (item.product.price * item.quantity);
      } else if(item.menu) {
        acc += (item.menu.price * item.quantity);
      }

      return acc;
    }, 0);
  }

  updateRemoveProduct(basket: Basket[]): void {
    if (basket) {
      this.basket = basket;

      this.updateTotal(); // update total price
      this.dataSource = new MatTableDataSource<any>(this.basket); // update table
    }
  }

  removeProduct(product: Product): void {
    this.order.cancelProduct(product);
  }

  removeMenu(menu: Menu): void {
    this.order.cancelMenu(menu);
  }

  runOrder(): void {
    if(this.basket.length == 0) {
      return;
    }

    const order: Order = this.basket.reduce((acc: Order, item: Basket) => {
      if(item.product) {
        acc.products.push({ product: item.product, quantity: item.quantity });
        acc.price += (item.product.price * item.quantity);
      } else if(item.menu) {
        acc.menus.push({ menu: item.menu, quantity: item.quantity });
        acc.price += (item.menu.price * item.quantity);
      }

      return acc;
    }, { price: 0, status: "", products: [], menus: [], createdAt: "" });

    this
      .http
      .post(this.globals.resolveAPIAddress("/orders/new"), { order: order }).subscribe(
        (response: any) => {
          this.dialog.show(JSON.stringify(response, null, 2), "Récapitulatif de la commande");
          this.router.navigate([ "/" ]);
        },
        err => console.error(err)
      );
  }

  cancelOrder(): void {
    this.router.navigate([ "/" ]);
  }

  displayPrice(x): String {
    return Number.parseFloat(x).toFixed(2);
  }

}
