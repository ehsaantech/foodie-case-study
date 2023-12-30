import { HttpException, HttpStatus } from "@nestjs/common";

export class UserNotFound extends HttpException {

    constructor(userName: string) {
        super("User not found against userName : " + userName, HttpStatus.BAD_REQUEST)
    }

}