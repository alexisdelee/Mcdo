import { Component, OnInit } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { MatTableDataSource } from "@angular/material";


import { Globals } from "../Globals";
import { TokenService } from "../../services/token/token.service";


@Component({
  selector: "app-admin",
  templateUrl: "./admin.component.html",
  styleUrls: [ "./admin.component.css" ],
  providers: [ Globals ]
})

export class AdminComponent implements OnInit {

  token: string;
  visibilityToken: boolean = false;
  dataSource: any;

  constructor(
    private http: HttpClient,
    private globals: Globals,
    private tokenService: TokenService) {
    this.tokenService.checkToken(
      sessionStorage.getItem("token") || "",
      () => this.initAdmin(sessionStorage.getItem("token")),
      () => this.disconnect()
    );
  }

  ngOnInit() { }

  initAdmin(token: string): void {
    this.token = token;

    const headers = new HttpHeaders({ "x-access-token": token });

    this
      .http
      .get(this.globals.resolveAPIAddress("/orders"), { headers: headers })
      .subscribe(
        (item: any) => {
          console.log(item);

          this.token = item.token;
          this.dataSource = new MatTableDataSource(item.items);
        },
        (err: any) => console.error(err)
      );
  }

  receiveToken($event) {
    this.token = $event;
  }

  disconnect(): void {
    this.token = this.tokenService.removeToken();
  }

}
