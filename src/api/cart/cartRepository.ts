import { randomUUID } from "node:crypto";
import type { CartItem } from "@/api/cart/cartModel";
import db from "../../db";
import type { Product } from "../product/productModel";

export class CartRepository {
  async findAllAsync(): Promise<CartItem[]> {
    const data: CartItem[] = db
      .prepare("SELECT * FROM carts")
      .all() as CartItem[];

    return data;
  }

  async findByIdAsync(id: string): Promise<CartItem[] | null> {
    const data: CartItem[] = db
      .prepare(`SELECT * FROM carts WHERE id = '${id}'`)
      .all() as CartItem[];

    console.log("data", data);

    const productsIds: string[] = data.reduce((acc: string[], item) => {
      if (acc.indexOf(item.productId) === -1) {
        acc.push(item.productId);
      }
      return acc;
    }, []);

    console.log("productsIds", productsIds);

    const products: Product[] = db
      .prepare(`SELECT * FROM products WHERE id IN (${productsIds.join(",")})`)
      .all() as Product[];

    const result = data.map((item) => {
      const product = products.find((p) => p.id === item.productId);
      return {
        ...item,
        product: product || null,
      };
    });

    return result;
  }

  async createOrder(ids: string[]): Promise<string | null> {
    const newUID = randomUUID();
    const stmt = db.prepare(
      "INSERT INTO carts (id, productId, paid) VALUES (?, ?, ?)"
    );
    for (const id of ids) {
      stmt.run(newUID, id, "false");
    }
    return newUID;
  }
}
