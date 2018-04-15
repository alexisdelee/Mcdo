import { Component, OnInit } from "@angular/core";
import { MatTableDataSource } from "@angular/material";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from "@angular/router";


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
    this.dataSource = new MatTableDataSource<any>(this.basket);
  }

  updateNewProduct(basket: Basket[]): void {
    if (basket) {
      this.basket = basket;
      this.dataSource = new MatTableDataSource<any>(this.basket); // update table
    }
  }

  updateRemoveProduct(basket: Basket[]): void {
    if (basket) {
      this.basket = basket;
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
    const order: Order = new Order();

    order.products = this.basket.filter((item: Basket) => item.product).map((item: Basket) => item.product);
    order.price = order.products.reduce((acc: number, el: Product) => acc + el.price, 0);

    order.menus = this.basket.filter((item: Basket) => item.menu).map((item: Basket) => item.menu);
    order.price = order.menus.reduce((acc: number, el: Menu) => acc + el.price, order.price);

    this
      .http
      .post(this.globals.resolveAPIAddress("/orders/new"), {
        products: order.products,
        menus: order.menus,
        price: order.price
      }).subscribe(
        (response: any) => {
          this.dialog.show(JSON.stringify(response, null, 2), "Récapitulatif de la commande");
          this.router.navigate([ "/" ]);
        },
        err => console.error(err)
      )
  }

  cancelOrder(): void {
    this.router.navigate([ "/" ]);
  }

}
