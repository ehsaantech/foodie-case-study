import { Login, Users } from "@prisma/client";
import { UserDto } from "src/api/user/dto/user.dto";
import { hashPassword } from "../utils/encrypt.util";
import { UserResponse } from "../models/UserResponse";

export class UserMapper {


    public static dtoToLoginDatabaseMapper(dto: UserDto): Omit<Login, "Id"> {
        return {
            userName: dto.userName,
            password: hashPassword(dto.password)
        }
    }


    public static dtoToUserDatabaseMapper(dto: UserDto, loginId: number): Omit<Users, "Id"> {
        return {
            age: dto.age,
            firstName: dto.firstName,
            email: dto.email,
            lastName: dto.lastName,
            role: dto.role,
            loginId: loginId
        }
    }

    public static databaseToUserResponseMapper(user: Users): UserResponse {
        return {
            id: user.Id,
            age: user.age,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            role: user.role
        }
    }

}