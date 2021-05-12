import { ShoppingCartItems } from './ShoppingCartItems.model';

export interface ShoppingCart {
  key?: string | null;
  dateCreated?: number;
  items?: { [key: string]: ShoppingCartItems };
}
