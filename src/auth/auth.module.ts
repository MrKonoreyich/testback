import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { TypegooseModule } from 'nestjs-typegoose';
import { UserModel } from '../models/user.model';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { getJwtConfig } from '../configs/jwt.config';
import { PassportModule } from '@nestjs/passport';

@Module({
  controllers: [AuthController],
  imports: [
    TypegooseModule.forFeature([
      {
        typegooseClass: UserModel,
        schemaOptions: {
          collection: 'Users'
        }
      }
    ]),
    ConfigModule,
    JwtModule.registerAsync({
      imports:[ConfigModule],
      inject:[ConfigService],
      useFactory: getJwtConfig
    }),
    PassportModule
  ],
  providers: [AuthService],
  exports: [AuthService]
})
export class AuthModule {}