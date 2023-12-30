import { z } from 'zod';

export const dishZodSchema = z
    .object({
        name: z.string(),
        description: z.string(),
        price: z.number(),
        image: z.string(), //base 64 encoded string
    })
    .required();


export type DishDto = z.infer<typeof dishZodSchema>;
