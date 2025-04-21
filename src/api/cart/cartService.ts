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
}

export const cartService = new CartService();
