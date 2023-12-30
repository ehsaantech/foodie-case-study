import { UserRole } from '@prisma/client';
import { z } from 'zod';


export const userZodSchema = z
    .object({
        firstName: z.string(),
        lastName: z.string(),
        email: z.string().email(),
        age: z.number(),
        role : z.enum([UserRole.FOODIE,UserRole.CHEF]),
        userName : z.string(),
        password : z.string()
    })
    .required();



export type UserDto = z.infer<typeof userZodSchema>;