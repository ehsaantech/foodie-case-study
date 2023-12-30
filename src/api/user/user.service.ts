import { Injectable } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { Login, Users } from '@prisma/client';
import { DatabaseService } from '../../core/database/database.service';
import { UserMapper } from '../../core/mappers/user.mapper';
import { isUniqueConstraintViolationError } from '../../core/utils/errors';
import { UniqueEmailOrUserNameException } from '../../core/exceptions/unique.voilation';

@Injectable()
export class UserService {

    constructor(private readonly database: DatabaseService) { }



    async addUser(dto: UserDto) {

        try {
            // save login first
            let login: Login = await this.database.login.create({ data: UserMapper.dtoToLoginDatabaseMapper(dto) });
            let user: Users = await this.database.users.create({ data: UserMapper.dtoToUserDatabaseMapper(dto, login.Id) });
            return UserMapper.databaseToUserResponseMapper(user);
        }
        catch(e) {
            if(isUniqueConstraintViolationError(e)){
                throw new UniqueEmailOrUserNameException();
            }
        }

    }
}
