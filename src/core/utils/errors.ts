import { Prisma } from "@prisma/client";



export const isUniqueConstraintViolationError = (error: any): boolean => {
    return (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
    );
}