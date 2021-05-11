import { Product } from './Product.model';

export interface ShoppingCartItems {
  product?: Product;
  quantity?: number;
}
