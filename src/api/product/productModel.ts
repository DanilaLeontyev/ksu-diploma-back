import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";

import { commonValidations } from "@/common/utils/commonValidation";

extendZodWithOpenApi(z);

export type Product = z.infer<typeof ProductSchema>;
export const ProductSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  price: z.number(),
  image: z.string(),
});

// Input Validation for 'GET products/:id' endpoint
export const GetProductSchema = z.object({
  params: z.object({ id: commonValidations.id }),
});
