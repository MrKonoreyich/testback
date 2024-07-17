import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypegooseModule } from 'nestjs-typegoose';
import { userModel } from '../models/user.model';

@Module({
  controllers: [AuthController],
  imports: [
    TypegooseModule.forFeature([
      {
        typegooseClass: userModel,
        schemaOptions: {
          collection: 'Users'
        }
      }
    ])
  ],
  providers: [AuthService],
})
export class AuthModule {}
