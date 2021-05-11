import { ShoppingCartItems } from './ShoppingCartItems.model';

export interface ShoppingCart {
  key: string;
  dateCreated: number;
  items?: ShoppingCartItems[];
}
