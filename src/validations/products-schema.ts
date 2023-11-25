import { z, type Schema } from "zod";
import { Product } from "@/entities/product-entity";

export const productSchema: Schema<Omit<Product, "id">> = z.object({
    name: z.string().trim().min(3).max(250),
    description: z.string().trim().max(550).nullable(),
    price: z.coerce.number(),
});

export const productWithIdSchema: Schema<Product> = productSchema.and(
    z.object({ id: z.string() })
);

export const productsWithIdSchema = z.array(productWithIdSchema)
