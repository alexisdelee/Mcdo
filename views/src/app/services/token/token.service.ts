import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from "@angular/router";


import { Globals } from "../../views/Globals";


@Injectable()
export class TokenService {

  private globals: Globals;

  constructor(
    private http: HttpClient,
    private router: Router) {
    this.globals = new Globals();
  }

  checkToken(token, success, err): void {
    this
      .http
      .post(this.globals.resolveAPIAddress("/users/token/verify"), { token: token })
      .subscribe(() => success(), () => err());
  }

  removeToken(): null {
    sessionStorage.removeItem("token");
    return null;
  }

  getToken(login, password, success, err): void {
    this
      .http
      .post(this.globals.resolveAPIAddress("/users/token/authorization"), { login: login, password: password })
      .subscribe((data: any) => success(data), (data: any) => err(data));
  }

}
