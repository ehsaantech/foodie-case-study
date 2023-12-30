import { UserRole } from "@prisma/client"

export interface CustomPayload {
    id : number
    firstName: string
    lastName: string
    email: string
    age: number
    role: UserRole
}