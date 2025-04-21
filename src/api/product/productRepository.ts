import type { Product } from "@/api/product/productModel";
import db from "../../db";

export class ProductRepository {
  async findAllAsync(): Promise<Product[]> {
    const data: Product[] = db
      .prepare("SELECT * FROM products")
      .all() as Product[];
    return data;
  }
}
