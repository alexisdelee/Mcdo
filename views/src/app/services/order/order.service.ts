import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs/BehaviorSubject";


import { Product } from "../../models/Product";


@Injectable()
export class OrderService {

  private orderSource = new BehaviorSubject(null);
  currentOrder = this.orderSource.asObservable();

  private cancelSource = new BehaviorSubject(null);
  currentCancel = this.cancelSource.asObservable();

  constructor() { }

  orderProduct(product: Product): void {
    this.orderSource.next(product);
  }

  cancelProduct(product: Product): void {
    this.cancelSource.next(product);
  }

}
