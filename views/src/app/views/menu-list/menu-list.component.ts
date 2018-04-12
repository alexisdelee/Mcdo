import { Component, OnInit } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ActivatedRoute } from "@angular/router";


import { Globals } from "../Globals";
import { Menu } from "../../models/Menu";


@Component({
  selector: "app-menu-list",
  templateUrl: "./menu-list.component.html",
  styleUrls: [ "./menu-list.component.css" ],
  providers: [ Globals ]
})

export class MenuListComponent implements OnInit {

  menus: Menu[];

  constructor(
    private globals: Globals,
    private http: HttpClient,
    private url: ActivatedRoute) {
    this.menus = [];
  }

  ngOnInit() {
    const id = this.url.snapshot.paramMap.get("id");
    if (id) {
      this.getMenuById(id);
    } else {
      this.getMenus();
    }
  }

  getMenuById(id: string): void {
    this
      .http
      .get(this.globals.resolveAPIAddress("/menus/" + id))
      .subscribe(
        (menu: any) => this.menus = [ menu.items ],
        (err: any) => console.error(err)
      );
  }

  getMenus(): void {
    this
      .http
      .get(this.globals.resolveAPIAddress("/menus"))
      .subscribe(
        (menu: any) => this.menus = menu.items,
        (err: any) => console.error(err)
      );
  }

}
