import type { Request, RequestHandler, Response } from "express";

import { productService } from "@/api/product/productService";
import { handleServiceResponse } from "@/common/utils/httpHandlers";

class CartController {
  public getCarts: RequestHandler = async (_req: Request, res: Response) => {
    const serviceResponse = await cartService.findAll();
    return handleServiceResponse(serviceResponse, res);
  };
}

export const cartController = new CartController();
