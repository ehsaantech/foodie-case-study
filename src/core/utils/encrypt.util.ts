
import { hashSync, compareSync } from "bcryptjs";




export const hashPassword = (plainPassword: string) => {
    const saltRounds = 10;
    return hashSync(plainPassword, saltRounds);
}


export const comparePassword = (hash: string, plainPassword: string) => {
    return compareSync(plainPassword, hash);
}
