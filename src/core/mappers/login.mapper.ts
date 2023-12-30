import {Users } from "@prisma/client";
import { CustomPayload } from "../models/Payload";

export class LoginMapper {
    public static userToJWTMapper(user: Users): CustomPayload {
        return {
            id : user.Id,
            age : user.age,
            email : user.email,
            firstName : user.firstName,
            lastName : user.lastName,
            role : user.role
        }
    }



}