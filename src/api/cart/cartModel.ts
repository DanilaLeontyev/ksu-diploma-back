import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";

import { commonValidations } from "@/common/utils/commonValidation";

extendZodWithOpenApi(z);

export type CartItem = z.infer<typeof CartItemSchema>;
export const CartItemSchema = z.object({});

// Input Validation for 'GET cart/:id' endpoint
export const GetCartSchema = z.object({
  params: z.object({ id: commonValidations.id }),
});
