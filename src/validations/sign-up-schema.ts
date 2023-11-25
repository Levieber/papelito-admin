import { z } from "zod";

export const signUpSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
});

export const signUpResponseSchema = z
    .object({
        id: z.string(),
        token: z.string(),
        name: z.string(),
        email: z.string().email(),
    })
    .or(z.string());
