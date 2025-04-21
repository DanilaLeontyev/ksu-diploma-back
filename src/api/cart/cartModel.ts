import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";

import { commonValidations } from "@/common/utils/commonValidation";

extendZodWithOpenApi(z);

export type CartItem = z.infer<typeof CartItemSchema>;
export const CartItemSchema = z.object({
  id: z.string(),
  productId: z.string(),
  paid: z.boolean(),
});

// Input Validation for 'GET cart/:id' endpoint
export const GetCartSchema = z.object({
  params: z.object({ id: z.string() }),
});

// Input Validation for 'POST cart/' endpoint
export const PostCartSchema = z.object({
  body: z.object({
    productIds: z.array(commonValidations.id),
  }),
});
