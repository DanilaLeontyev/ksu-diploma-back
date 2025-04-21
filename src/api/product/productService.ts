import { StatusCodes } from "http-status-codes";

import type { Product } from "@/api/product/productModel";
import { ProductRepository } from "@/api/product/productRepository";
import { ServiceResponse } from "@/common/models/serviceResponse";
import { logger } from "@/server";

export class ProductService {
  private productRepository: ProductRepository;

  constructor(repository: ProductRepository = new ProductRepository()) {
    this.productRepository = repository;
  }

  // Retrieves all products from the database
  async findAll(): Promise<ServiceResponse<Product[] | null>> {
    try {
      const products = await this.productRepository.findAllAsync();
      if (!products || products.length === 0) {
        return ServiceResponse.failure(
          "No Products found",
          null,
          StatusCodes.NOT_FOUND
        );
      }
      return ServiceResponse.success<Product[]>("Products found", products);
    } catch (ex) {
      const errorMessage = `Error finding all products: $${
        (ex as Error).message
      }`;
      logger.error(errorMessage);
      return ServiceResponse.failure(
        "An error occurred while retrieving products.",
        null,
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }
}

export const productService = new ProductService();
