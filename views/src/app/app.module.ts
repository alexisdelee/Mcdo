import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule } from "@angular/forms";


import { CapitalizePipe } from "./pipes/capitalize";
import { KeysPipe } from "./pipes/keys";

import { AppRoutingModule } from "./app-routing.module";

import { TokenService } from "./services/token/token.service";
import { DialogService } from "./services/dialog/dialog.service";

import { AppComponent } from "./app.component";
import { MaterialModule } from "./material.module";
import { HeaderComponent } from "./views/header/header.component";
import { HomeComponent } from "./views/home/home.component";
import { UserComponent } from "./views/user/user.component";
import { AdminComponent } from "./views/admin/admin.component";
import { LoginComponent } from "./views/login/login.component";
import { DialogComponent } from "./views/dialog/dialog.component";
import { ProductComponent } from "./views/product/product.component";


@NgModule({
  declarations: [
    CapitalizePipe,
    KeysPipe,
    AppComponent,
    HeaderComponent,
    HomeComponent,
    UserComponent,
    AdminComponent,
    LoginComponent,
    DialogComponent,
    ProductComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [ TokenService, DialogService ],
  bootstrap: [ AppComponent ],
  entryComponents: [ DialogComponent ]
})

export class AppModule { }
