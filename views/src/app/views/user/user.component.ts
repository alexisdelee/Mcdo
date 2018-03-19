import {Component, OnInit} from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { HttpHeaders } from "@angular/common/http";
import { MatTableDataSource } from "@angular/material";


import { Product } from "../../models/Product";
import { Group } from "../../models/Group";


@Component({
  selector: "app-user",
  templateUrl: "./user.component.html",
  styleUrls: ["./user.component.css"]
})

export class UserComponent implements OnInit {

  public groups: [{ group: Group, product: Product }];
  public groupsTable;

  constructor(private http: HttpClient) {
    this.getAllGroups();
  }

  ngOnInit() { }

  getAllGroups(): void {
    this
      .http
      .get("http://localhost:3000/groups/products")
      .subscribe((data: any) => {
        console.log(data);

        this.groups = data.items;
        this.groupsTable = new MatTableDataSource(
          Object.entries(this.groups).map(group => {
            return { thumbnail: group[1][0].product.thumbnail, group: { id: group[1][0].group._id, name: group[1][0].group.name } };
          })
        );
      });
  };

  changeGroup(e): void {
    console.log(e);
  }

}
