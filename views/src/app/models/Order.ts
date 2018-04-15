import { Product } from "./Product";
import { Menu } from "./Menu";

export class Order {

  price: number;
  status: string;
  products: Product[];
  menus: Menu[];

}
