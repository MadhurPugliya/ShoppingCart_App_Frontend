import { Product } from './product.model';

export interface CartItem {
  productId: number;
  quantity: number;
  price: number;
  product?: Product; // Optional for frontend display
}
