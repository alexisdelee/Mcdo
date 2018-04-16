import { Ingredient } from "./Ingredient";
import { Group } from "./Group";


export class Product {

  _id: string;
  name: string;
  price: number;
  thumbnail: string;
  ingredients: Ingredient[];
  groups: Group[];
  quantity: number;

}
