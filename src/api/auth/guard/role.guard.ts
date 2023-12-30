import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserRole } from '@prisma/client';
import { Request } from 'express';
import { CustomPayload } from 'src/core/models/Payload';

@Injectable()
export class RoleGuard implements CanActivate {
    constructor(private role: UserRole) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const user: CustomPayload = request["user"];
        if (user.role === this.role)
            return true;


        return false;
    }
}