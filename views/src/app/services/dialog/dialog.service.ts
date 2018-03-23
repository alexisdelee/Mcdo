import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material";


import { DialogComponent } from "../../views/dialog/dialog.component";


@Injectable()
export class DialogService {

  constructor(public dialog: MatDialog) { }

  show(message: string, title?: string): void {
    let dialogRef = this.dialog.open(DialogComponent, {
      width: "350px",
      data: { message: message, title: title || "Error" }
    });
  }

}
