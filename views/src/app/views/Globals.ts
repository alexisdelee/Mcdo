import { Injectable } from "@angular/core";

@Injectable()
export class Globals {

  private host: string;
  private port: number | string;

  constructor() {
    this.host = "http://localhost";
    this.port = 3000;
  }

  resolveAPIAddress(url): string {
    return this.host + ":" + this.port + url;
  }

}
