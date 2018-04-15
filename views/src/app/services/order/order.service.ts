import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs/BehaviorSubject";


import { Basket } from "../../models/Basket";
import { Product } from "../../models/Product";
import { Menu } from "../../models/Menu";


@Injectable()
export class OrderService {

  basket: Basket[];

  private orderSource = new BehaviorSubject(null);
  currentOrder = this.orderSource.asObservable();

  private cancelSource = new BehaviorSubject(null);
  currentCancel = this.cancelSource.asObservable();

  constructor() {
    this.initBasket();
  }

  initBasket(): Basket[] {
    const sessionOrder = sessionStorage.getItem("order");

    if (sessionOrder) {
      this.basket = JSON.parse(sessionOrder);
    } else {
      this.basket = [];
    }

    return this.basket;
  }

  orderProduct(product: Product): void {
    const item = this.basket.find((item: Basket) => item.product && (item.product._id === product._id));

    if (item) { // already inserted
      item.quantity++;
    } else { // not already inserted
      this.basket.push({
        product: product,
        menu: null,
        quantity: 1
      });
    }

    sessionStorage.setItem("order", JSON.stringify(this.basket));
    this.orderSource.next(this.basket);
  }

  orderMenu(menu: Menu): void {
    const item = this.basket.find((item: Basket) => item.menu && (item.menu._id === menu._id));

    if (item) { // already inserted
      item.quantity++;
    } else { // not already inserted
      this.basket.push({
        product: null,
        menu: menu,
        quantity: 1
      });
    }

    sessionStorage.setItem("order", JSON.stringify(this.basket));
    this.orderSource.next(this.basket);
  }

  cancelProduct(product: Product): void {
    const id = this.basket.findIndex((item: Basket) => item.product && (item.product._id === product._id));

    if (id > -1) {
      if (this.basket[id].quantity > 1) {
        this.basket[id].quantity--;
      } else {
        this.basket.splice(id, 1);
      }

      sessionStorage.setItem("order", JSON.stringify(this.basket));
      this.cancelSource.next(this.basket);
    }
  }

  cancelMenu(menu: Menu): void {
    const id = this.basket.findIndex((item: Basket) => item.menu && (item.menu._id === menu._id));

    if (id > -1) {
      if (this.basket[id].quantity > 1) {
        this.basket[id].quantity--;
      } else {
        this.basket.splice(id, 1);
      }

      sessionStorage.setItem("order", JSON.stringify(this.basket));
      this.cancelSource.next(this.basket);
    }
  }

}
