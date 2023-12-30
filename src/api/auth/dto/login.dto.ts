import { z } from 'zod';


export const loginZodSchema = z
    .object({
        userName : z.string(),
        password : z.string()
    })
    .required();

export type LoginDto = z.infer<typeof loginZodSchema>;