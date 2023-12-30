import { HttpException, HttpStatus } from "@nestjs/common";

export class UniqueEmailOrUserNameException extends HttpException {

    constructor() {
        super("UserName and Email Should be Unique", HttpStatus.BAD_REQUEST)
    }

}