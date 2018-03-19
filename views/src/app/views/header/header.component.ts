import { Component, OnInit } from "@angular/core";
import { Location } from "@angular/common";
import { Router } from "@angular/router";


import { AppRoutingModule } from "../../app-routing.module";


@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: [ "./header.component.css" ]
})

export class HeaderComponent implements OnInit {

  appRouting: AppRoutingModule;

  constructor(private router: Router, private location: Location) {
    this.appRouting = new AppRoutingModule(router, location);
  }

  ngOnInit() { }

}
