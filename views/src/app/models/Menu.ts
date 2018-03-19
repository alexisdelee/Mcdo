import { Product } from "./Product";

export class Menu {

  _id: string;
  name: string;
  price: number;
  products: Product[];
  dateStart: Date;
  dateEnd: Date;

}
