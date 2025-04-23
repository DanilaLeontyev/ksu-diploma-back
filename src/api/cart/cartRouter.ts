import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import express, { type Router } from "express";
import { any, z } from "zod";

import { createApiResponse } from "@/api-docs/openAPIResponseBuilders";
import {
  CartItemSchema,
  GetCartSchema,
  PostCartSchema,
  PostPayOrderSchema,
} from "@/api/cart/cartModel";
import { validateRequest } from "@/common/utils/httpHandlers";
import { cartController } from "./cartController";

export const cartRegistry = new OpenAPIRegistry();
export const cartRouter: Router = express.Router();

cartRegistry.register("Cart", CartItemSchema);

cartRegistry.registerPath({
  method: "get",
  path: "/carts",
  tags: ["Cart"],
  responses: createApiResponse(z.array(CartItemSchema), "Success"),
});

cartRouter.get("/", cartController.getCarts);

cartRegistry.registerPath({
  method: "get",
  path: "/carts/{id}",
  tags: ["Cart"],
  request: { params: GetCartSchema.shape.params },
  responses: createApiResponse(CartItemSchema, "Success"),
});

cartRouter.get("/:id", validateRequest(GetCartSchema), cartController.getCart);

cartRegistry.registerPath({
  method: "post",
  path: "/carts",
  tags: ["Cart"],
  request: {
    body: {
      content: {
        "application/json": {
          schema: PostCartSchema.shape.body,
        },
      },
    },
  },
  responses: createApiResponse(z.string(), "Success"),
});

cartRouter.post("/", cartController.createOrder);

cartRegistry.registerPath({
  method: "post",
  path: "/carts/payorder",
  tags: ["Cart"],
  request: {
    body: {
      content: {
        "application/json": {
          schema: PostPayOrderSchema.shape.body,
        },
      },
    },
  },
  responses: createApiResponse(z.string(), "Success"),
});

cartRouter.post("/payorder", cartController.payOrder);
