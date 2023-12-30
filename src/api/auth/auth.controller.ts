import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiBody, ApiTags } from '@nestjs/swagger';
import { userZodSchema, UserDto } from '../user/dto/user.dto';
import { LoginDto, loginZodSchema } from './dto/login.dto';
import { AuthService } from './auth.service';
import BaseResponse from '../../core/models/BaseResponse';
import { ZodValidationPipe } from '../../core/validation/zod.pipe';

@ApiTags("Authentication")
@Controller('auth')
export class AuthController {


    constructor(private readonly authService : AuthService){}

    @ApiOperation({ summary: "Login User", description: "Login User with username and password" })
    @ApiResponse({ status: 200, description: 'Login successful' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @ApiBody({ required: true })
    @Post("/login")
    @UsePipes(new ZodValidationPipe(loginZodSchema))
    async loginUser(@Body() dto: LoginDto) {
        let result = await this.authService.loginUser(dto);
        return new BaseResponse(0,"success", result);
    }
}
