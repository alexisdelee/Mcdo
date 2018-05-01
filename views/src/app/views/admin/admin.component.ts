import { Component, OnInit, OnDestroy } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { NavigationEnd, Router } from "@angular/router";
import { MatTableDataSource } from "@angular/material";


import { Globals } from "../Globals";
import { TokenService } from "../../services/token/token.service";
import { OrderProduct } from "../../models/OrderProduct";


@Component({
  selector: "app-admin",
  templateUrl: "./admin.component.html",
  styleUrls: [ "./admin.component.css" ],
  providers: [ Globals ]
})

export class AdminComponent implements OnInit, OnDestroy {

  token: string;
  visibilityToken: boolean = false;
  dataSource: any;
  navigationSubscription;

  constructor(
    private http: HttpClient,
    private router: Router,
    private globals: Globals,
    private tokenService: TokenService) {
    this.tokenService.checkToken(
      sessionStorage.getItem("token") || "",
      () => {
        this.initAdmin(sessionStorage.getItem("token"));

        this.navigationSubscription = this.router.events.subscribe((e: any) => {
          if (e instanceof NavigationEnd) {
            this.initAdmin(sessionStorage.getItem("token"));
          }
        });
      },
      () => this.disconnect()
    );
  }

  ngOnInit() { }

  ngOnDestroy() {
    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();
    }
  }

  initAdmin(token: string): void {
    this.token = token;

    const headers = new HttpHeaders({ "x-access-token": token });

    this
      .http
      .get(this.globals.resolveAPIAddress("/orders"), { headers: headers })
      .subscribe(
        (item: any) => {
          item.items = item.items.reverse();

          this.token = item.token;
          this.dataSource = new MatTableDataSource(item.items);
        },
        (err: any) => console.error(err)
      );
  }

  receiveToken($event) {
    this.token = $event;
    this.initAdmin(this.token);
  }

  disconnect(): void {
    this.token = this.tokenService.removeToken();
  }

  getPriceForAllProducts(products: OrderProduct[]): number {
    return products.reduce((total: number, item: OrderProduct) => total + item.product.price * item.quantity, 0);
  }

}
