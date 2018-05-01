import { OrderProduct } from "./OrderProduct";
import { OrderMenu } from "./OrderMenu";

export class Order {

  price: number;
  status: string;
  products: OrderProduct[];
  menus: OrderMenu[];
  createdAt: String;

}
