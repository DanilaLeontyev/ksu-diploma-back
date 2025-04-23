import type { Request, RequestHandler, Response } from "express";

import { handleServiceResponse } from "@/common/utils/httpHandlers";
import { cartService } from "./cartService";

class CartController {
  public getCarts: RequestHandler = async (_req: Request, res: Response) => {
    const serviceResponse = await cartService.findAll();
    return handleServiceResponse(serviceResponse, res);
  };
  public getCart: RequestHandler = async (req: Request, res: Response) => {
    const id = req.params.id;
    const serviceResponse = await cartService.findById(id);
    return handleServiceResponse(serviceResponse, res);
  };
  public createOrder: RequestHandler = async (req: Request, res: Response) => {
    const ids = req.body.productIds;
    const serviceResponse = await cartService.createOrder(ids);
    return handleServiceResponse(serviceResponse, res);
  };
  public payOrder: RequestHandler = async (req: Request, res: Response) => {
    const ids = req.body.productUIDs;
    const cartId = req.body.cartId;
    const serviceResponse = await cartService.payOrder(ids, cartId);
    return handleServiceResponse(serviceResponse, res);
  };
}

export const cartController = new CartController();
