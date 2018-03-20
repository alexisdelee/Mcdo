import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from "@angular/router";


@Injectable()
export class TokenService {

  constructor(private http: HttpClient, private router: Router) { }

  checkToken(token, success, err): void {
    this
      .http
      .post("http://localhost:3000/users/token/verify", { token: token })
      .subscribe(() => success(), () => err());
  }

  removeToken(): null {
    sessionStorage.removeItem("token");
    return null;
  }

  getToken(login, password, success, err): void {
    this
      .http
      .post("http://localhost:3000/users/token/authorization", { login: login, password: password })
      .subscribe((data: any) => success(data), (data: any) => err(data));
  }

}
