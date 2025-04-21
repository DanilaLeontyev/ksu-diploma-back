import type { CartItem } from "@/api/cart/cartModel";
import db from "../../db";

export class CartRepository {
  async findAllAsync(): Promise<CartItem[]> {
    return [{ id: 1, productId: 1, quantity: 2 }];
  }
}
