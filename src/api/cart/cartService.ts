import { StatusCodes } from "http-status-codes";

import type { CartItem } from "@/api/cart/cartModel";
import { CartRepository } from "@/api/cart/cartRepository";
import { ServiceResponse } from "@/common/models/serviceResponse";
import { logger } from "@/server";

export class CartService {
  private cartRepository: CartRepository;

  constructor(repository: CartRepository = new CartRepository()) {
    this.cartRepository = repository;
  }

  // Retrieves all carts from the database
  async findAll(): Promise<ServiceResponse<CartItem[] | null>> {
    try {
      const carts = await this.cartRepository.findAllAsync();
      if (!carts || carts.length === 0) {
        return ServiceResponse.failure(
          "No Carts found",
          null,
          StatusCodes.NOT_FOUND
        );
      }
      return ServiceResponse.success<CartItem[]>("Carts found", carts);
    } catch (ex) {
      const errorMessage = `Error finding all carts: $${(ex as Error).message}`;
      logger.error(errorMessage);
      return ServiceResponse.failure(
        "An error occurred while retrieving carts.",
        null,
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }

  async findById(id: string): Promise<ServiceResponse<CartItem[] | null>> {
    try {
      const cartItems = await this.cartRepository.findByIdAsync(id.toString());
      if (!cartItems) {
        return ServiceResponse.failure(
          "Cart not found",
          null,
          StatusCodes.NOT_FOUND
        );
      }
      return ServiceResponse.success<CartItem[]>("Cart found", cartItems);
    } catch (ex) {
      const errorMessage = `Error finding cart with id ${id}:, ${
        (ex as Error).message
      }`;
      logger.error(errorMessage);
      return ServiceResponse.failure(
        "An error occurred while finding cart.",
        null,
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }

  async createOrder(ids: string[]): Promise<ServiceResponse<string | null>> {
    try {
      const orderId = await this.cartRepository.createOrder(ids);

      if (!orderId) {
        return ServiceResponse.failure(
          "Count not create order",
          null,
          StatusCodes.NOT_FOUND
        );
      }
      return ServiceResponse.success<string>("Order created", orderId);
    } catch (ex) {
      const errorMessage = `Error creating order with ids ${ids}:, ${
        (ex as Error).message
      }`;
      logger.error(errorMessage);
      return ServiceResponse.failure(
        "An error occurred while creating order.",
        null,
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }
}

export const cartService = new CartService();
