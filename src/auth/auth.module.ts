import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { TypegooseModule } from 'nestjs-typegoose';
import { UserModel } from '../models/user.model';
import { ConfigModule } from '@nestjs/config';
import { AuthService } from './auth.service';

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
    ConfigModule
  ],
  providers: [AuthService],
  exports: [AuthService]
})
export class AuthModule {}