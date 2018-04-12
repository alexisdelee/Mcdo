import { Component, OnInit } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ActivatedRoute } from "@angular/router";


import { Globals } from "../Globals";
import { Group } from "../../models/Group";


@Component({
  selector: "app-group-list",
  templateUrl: "./group-list.component.html",
  styleUrls: [ "./group-list.component.css" ],
  providers: [ Globals ]
})

export class GroupListComponent implements OnInit {

  groups: Group[];

  constructor(
    private globals: Globals,
    private http: HttpClient,
    private url: ActivatedRoute) {
    this.groups = [];
  }

  ngOnInit() {
    const id = this.url.snapshot.paramMap.get("id");
    if (id) {
      this.getGroupById(id);
    } else {
      this.getGroups();
    }
  }

  getGroupById(id: string): void {
    this
      .http
      .get(this.globals.resolveAPIAddress("/groups/products/" + id))
      .subscribe(
        (group: any) => this.groups = [ group.items ],
        (err: any) => console.error(err)
      );
  }

  getGroups(): void {
    this
      .http
      .get(this.globals.resolveAPIAddress("/groups/products"))
      .subscribe(
        (group: any) => this.groups = group.items,
        (err: any) => console.error(err)
      );
  }

  parseGroups(): Group[] {
    return Object.values(this.groups);
  }

}
