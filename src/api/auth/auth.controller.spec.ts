import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { DatabaseService } from '../../core/database/database.service';
import { JwtService } from '@nestjs/jwt';
import { ZodValidationPipe } from '../../core/validation/zod.pipe';
import { loginZodSchema } from './dto/login.dto';
import { log } from 'console';
import { UserRole } from '@prisma/client';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;
  let databaseService: DatabaseService;
  let jwtService: JwtService;

  const mockeService = {
    loginUser: () => {
      return "afaq"
    }
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService, DatabaseService, JwtService]
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
    databaseService = module.get<DatabaseService>(DatabaseService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(authService).toBeDefined();
    expect(databaseService).toBeDefined();
    expect(jwtService).toBeDefined();
  });


});
