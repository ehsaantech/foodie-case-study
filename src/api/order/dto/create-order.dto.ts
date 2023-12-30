
import { z } from 'zod';


export const orderZodSchema = z
    .object({
        dishes: z.array(z.object({
            id : z.number(),
            quantity : z.number()
        })),
        address : z.string(),
        totalAmount: z.number(),
        paidAmount: z.number(),
    })
    .required();



export type OrderDto = z.infer<typeof orderZodSchema>;