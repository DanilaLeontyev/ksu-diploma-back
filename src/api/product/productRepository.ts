import type { Product } from "@/api/product/productModel";
import db from "../../db";

export const products: Product[] = [
  {
    id: "1",
    name: "Ярость варвара",
    description:
      "джин, ликёр юдзу, лаймовый сок, кордиал Clavis “Юдзу, бамбук, лемонграсс”, грейпфрутовый сок, лаймовый сок, тоник, мёд",
    price: 299.9,
    image: "/images/1.png",
  },
  {
    id: "2",
    name: "Красный Халк",
    description:
      "кампари, черносмородиновый ликёр, мартини фиеро, лимонный сок, кордиал Clavis “шисо, земляника, лемонграсс”, лимонад “манго-чили”, табаско",
    price: 399.9,
    image: "/images/2.png",
  },
  {
    id: "3",
    name: "Железный человек",
    description:
      "виски, сироп клюква, яблочный сок, лимонный сок, слайс апельсина",
    price: 499.9,
    image: "/images/3.png",
  },
  {
    id: "4",
    name: "Капитан Америка",
    description:
      "водка, ликёр юдзу, лимонный сок, кордиал Clavis “юдзу, бамбук, лемонграсс”, тоник",
    price: 399.9,
    image: "/images/4.png",
  },
  {
    id: "5",
    name: "Тор",
    description:
      "ром, ликёр юдзу, лаймовый сок, кордиал Clavis “юдзу, бамбук, лемонграсс”, тоник",
    price: 399.9,
    image: "/images/5.png",
  },
  {
    id: "6",
    name: "Человек паук",
    description:
      "ром, ликёр юдзу, лаймовый сок, кордиал Clavis “юдзу, бамбук, лемонграсс”, тоник",
    price: 399.9,
    image: "/images/6.png",
  },
  {
    id: "7",
    name: "Чёрная вдова",
    description:
      "ром, ликёр юдзу, лаймовый сок, кордиал Clavis “юдзу, бамбук, лемонграсс”, тоник",
    price: 399.9,
    image: "/images/7.png",
  },
  {
    id: "8",
    name: "Супермен",
    description:
      "ром, ликёр юдзу, лаймовый сок, кордиал Clavis “юдзу, бамбук, лемонграсс”, тоник",
    price: 399.9,
    image: "/images/8.png",
  },
  {
    id: "9",
    name: "Супермен",
    description:
      "ром, ликёр юдзу, лаймовый сок, кордиал Clavis “юдзу, бамбук, лемонграсс”, тоник",
    price: 399.9,
    image: "/images/9.png",
  },
  {
    id: "10",
    name: "Супермен",
    description:
      "ром, ликёр юдзу, лаймовый сок, кордиал Clavis “юдзу, бамбук, лемонграсс”, тоник",
    price: 399.9,
    image: "/images/10.png",
  },
];

export class ProductRepository {
  async findAllAsync(): Promise<Product[]> {
    const data: Product[] = db.query("SELECT * FROM products", []);
    return data;
  }
}
