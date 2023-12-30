import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { DatabaseService } from '../../core/database/database.service';
import { LoginMapper } from '../../core/mappers/login.mapper';
import { comparePassword } from '../../core/utils/encrypt.util';
import { UserNotFound } from '../../core/exceptions/UserNotFound';
import { InvalidCredentialsException } from '../../core/exceptions/InvalidCredintionals';

@Injectable()
export class AuthService {

    constructor(private readonly database : DatabaseService , private readonly jwtService : JwtService){}


    async loginUser(dto : LoginDto) {
        const user = await this.database.users.findFirst({
            include : {login : true},
            where : {
                login : {
                    userName : dto.userName
                }
            }
        })

        if(!user) throw new UserNotFound(dto.userName);
        if(user && !comparePassword(user.login.password,dto.password)) throw new InvalidCredentialsException();

        return await this.jwtService.signAsync(LoginMapper.userToJWTMapper(user));
    }
}
