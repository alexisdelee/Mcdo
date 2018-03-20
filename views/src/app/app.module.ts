import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule } from "@angular/forms";


import { CapitalizePipe } from "./pipes/capitalize";
import { KeysPipe } from "./pipes/keys";

import { AppRoutingModule } from "./app-routing.module";

import { TokenService } from "./services/token/token.service";

import { AppComponent } from "./app.component";
import { MaterialModule } from "./material.module";
import { HeaderComponent } from "./views/header/header.component";
import { HomeComponent } from "./views/home/home.component";
import { UserComponent } from "./views/user/user.component";
import { AdminComponent } from "./views/admin/admin.component";
import { LoginComponent } from "./views/login/login.component";


@NgModule({
  declarations: [
    CapitalizePipe,
    KeysPipe,
    AppComponent,
    HeaderComponent,
    HomeComponent,
    UserComponent,
    AdminComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [ TokenService ],
  bootstrap: [ AppComponent ]
})

export class AppModule { }
