import { Component, EventEmitter, Output, OnInit} from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from "@angular/router";


import { TokenService } from "../../services/token/token.service";
import { DialogService } from "../../services/dialog/dialog.service";


@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: [ "./login.component.css" ]
})

export class LoginComponent implements OnInit {

  public login: string;
  public password: string;
  public token: string;

  @Output() tokenEvent = new EventEmitter<string>();

  constructor(
    private http: HttpClient,
    private router: Router,
    private tokenService: TokenService,
    private dialogService: DialogService) { }

  ngOnInit() { }

  enterPress(e: any) {
    if(e.keyCode === 13) {
      this.connect();
    }
  }

  connect(): void {
    this.tokenService.getToken(this.login, this.password,
      (data: any) => {
        this.token = data.token;
        sessionStorage.setItem("token", this.token);

        this.sendMessage();
      },
      (err: any) =>  {
        if (err.status === 401) {
          this.dialogService.show(err.error.message);
        } else {
          this.dialogService.show(JSON.stringify(err.error));
        }
      }
    );
  }

  sendMessage() {
    this.tokenEvent.emit(this.token);
  }

}
