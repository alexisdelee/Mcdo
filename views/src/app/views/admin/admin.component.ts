import { Component, OnInit, OnDestroy } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { NavigationEnd, Router } from "@angular/router";
import { MatTableDataSource } from "@angular/material";


import { Globals } from "../Globals";
import { TokenService } from "../../services/token/token.service";
import { OrderProduct } from "../../models/OrderProduct";
import { OrderMenu } from "../../models/OrderMenu";


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
  items: any;
  refresh: any;

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
    this.getAllOrders();

    this.refresh = setInterval(() => this.getAllOrders(), 5000); // refresh
  }

  receiveToken($event) {
    this.token = $event;
    this.initAdmin(this.token);
  }

  disconnect(): void {
    clearInterval(this.refresh);
    this.token = this.tokenService.removeToken();
  }

  getAllOrders(): void {
    const headers = new HttpHeaders({ "x-access-token": this.token });

    this
      .http
      .get(this.globals.resolveAPIAddress("/orders"), { headers: headers })
      .subscribe(
        (item: any) => {
          this.items = item.items.filter(item => item.status == "waiting").reverse();

          this.token = item.token;
          this.dataSource = new MatTableDataSource(this.items);
        },
        (err: any) => console.error(err)
      );
  }

  updateOrder(id: String, status: String): void {
    const headers = new HttpHeaders({ "x-access-token": this.token });

    this
      .http
      .put(this.globals.resolveAPIAddress("/orders/" + id + "/status"), { order: { attribute: status } }, { headers: headers })
      .subscribe(
        (item: any) => {
          const index = this.items.findIndex(item => item._id === id);
          if(index != -1) {
            this.items.splice(index, 1);
            this.dataSource = new MatTableDataSource(this.items);
          }
        },
        (err: any) => console.error(err)
      );
  }

  getLocalDate(date: string): String {
    return date ? (new Date(date)).toLocaleString("fr-FR", { timeZone: "UTC" }) : "";
  }

  getPriceForAllMenus(menus: OrderMenu[]): number {
    return menus.reduce((total: number, item: OrderMenu) => total + item.menu.price * item.quantity, 0);
  }

  getPriceForAllProducts(products: OrderProduct[]): number {
    return products.reduce((total: number, item: OrderProduct) => total + item.product.price * item.quantity, 0);
  }

  displayPrice(x): String {
    return Number.parseFloat(x).toFixed(2);
  }

}
