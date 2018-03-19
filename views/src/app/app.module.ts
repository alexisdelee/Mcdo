import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule } from "@angular/forms";


import { CapitalizePipe } from "./pipes/capitalize";
import { KeysPipe } from "./pipes/keys";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { MaterialModule } from "./material.module";
import { HeaderComponent } from "./views/header/header.component";
import { HomeComponent } from "./views/home/home.component";
import { UserComponent } from "./views/user/user.component";


@NgModule({
  declarations: [
    CapitalizePipe,
    KeysPipe,
    AppComponent,
    HeaderComponent,
    HomeComponent,
    UserComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [ AppComponent ]
})

export class AppModule { }
