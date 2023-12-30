import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiBody, ApiTags } from '@nestjs/swagger';
import BaseResponse from 'src/core/models/BaseResponse';
import { ZodValidationPipe } from 'src/core/validation/zod.pipe';
import { UserDto, userZodSchema } from './dto/user.dto';
import { UserService } from './user.service';

@ApiTags("Users")
@Controller('user')
export class UserController {


    constructor(private readonly userService: UserService) { }

    @ApiOperation({ summary: "Registed User", description: "Register user with specific Role (FOODIE/CHEF)" })
    @ApiResponse({ status: 201 })
    @ApiBody({ required: true })
    @Post("/add")
    @UsePipes(new ZodValidationPipe(userZodSchema))
    async addChef(@Body() dto: UserDto) {
        let result = await this.userService.addUser(dto);
        return new BaseResponse(0, "success", result);
    }
}
