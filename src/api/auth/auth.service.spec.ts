import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { DatabaseService } from '../../core/database/database.service';
import { UnauthorizedException } from '@nestjs/common';
import { UserNotFound } from '../../core/exceptions/UserNotFound';
import { InvalidCredentialsException } from '../../core/exceptions/InvalidCredintionals';
import { string } from 'zod';
import { hashPassword } from '../../core/utils/encrypt.util';
import { CustomPayload } from '../../core/models/Payload';

describe('AuthService', () => {
  let service: AuthService;
  let jwtService: JwtService;

  const mockUsers = [
    {
      firstName: "afaq",
      lastName: "javed",
      email: "afaq@test.com",
      age: 22,
      role: "FOODIE",
      login : {
        userName: "afaq10005",
        password : hashPassword("admin")
      }
    }
  ];

  const mockDatabaseService = {
    users: {
      findFirst: async (obj : any ) => {
        let user = mockUsers.find((user) => user.login.userName === obj.where.login.userName)
        return user;
      }
    }
  }


  const mockJWTService = {
    signAsync : async (payload : CustomPayload) =>{
      return "this will be the jwt token"
    }
  }



  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService, JwtService, DatabaseService],
    })
      .overrideProvider(DatabaseService).useValue(mockDatabaseService)
      .overrideProvider(JwtService).useValue(mockJWTService)
      .compile();

    service = module.get<AuthService>(AuthService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(jwtService).toBeDefined();
  });


  describe('Login User', () => {

    it('should authenticate user with anonymous user', async () => {
      await expect(service.loginUser({ password: "fakepassword", userName: "fakeuser" })).rejects.toThrow(UserNotFound);
    });

    it('should authenticate user with valid user but invalid Password', async () => {
      expect( service.loginUser({ password: "fakepassword", userName: "afaq10005" })).rejects.toThrow(InvalidCredentialsException);
    });

    it('should authenticate user and provide token with valid user and Password', async () => {
      expect(typeof await service.loginUser({ password: "admin", userName: "afaq10005" })).toBe('string');
    });

  });
});
