import { Component, OnInit } from "@angular/core";


import { TokenService } from "../../services/token/token.service";


@Component({
  selector: "app-admin",
  templateUrl: "./admin.component.html",
  styleUrls: [ "./admin.component.css" ]
})

export class AdminComponent implements OnInit {

  public token: string;
  public visibilityToken: boolean = false;

  constructor(private tokenService: TokenService) {
    this.tokenService.checkToken(
      sessionStorage.getItem("token") || "",
      () => this.token = sessionStorage.getItem("token"),
      () => this.disconnect()
    );
  }

  ngOnInit() { }

  receiveToken($event) {
    this.token = $event;
  }

  disconnect(): void {
    this.token = this.tokenService.removeToken();
  }

}
