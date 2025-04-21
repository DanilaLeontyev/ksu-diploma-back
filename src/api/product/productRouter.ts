import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import express, { type Router } from "express";
import { z } from "zod";

import { createApiResponse } from "@/api-docs/openAPIResponseBuilders";
import { GetProductSchema, ProductSchema } from "@/api/product/productModel";
import { validateRequest } from "@/common/utils/httpHandlers";
import { productController } from "./productController";

export const productRegistry = new OpenAPIRegistry();
export const productRouter: Router = express.Router();

productRegistry.register("Product", ProductSchema);

productRegistry.registerPath({
  method: "get",
  path: "/products",
  tags: ["Product"],
  responses: createApiResponse(z.array(ProductSchema), "Success"),
});

productRouter.get("/", productController.getProducts);

productRegistry.registerPath({
  method: "get",
  path: "/products/{id}",
  tags: ["Product"],
  request: { params: GetProductSchema.shape.params },
  responses: createApiResponse(ProductSchema, "Success"),
});

productRouter.get(
  "/:id",
  validateRequest(GetProductSchema),
  productController.getProducts
);
