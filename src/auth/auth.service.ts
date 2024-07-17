import { UserModel } from '../models/user.model';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { InjectModel } from 'nestjs-typegoose';
import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { compare, genSalt, genSaltSync, hash, hashSync } from 'bcryptjs';
import { AuthDto } from './dto/auth.dto';
import { PASS_NOT_MATCH_ERR, USER_NOT_FOUND_ERR } from './auth.constants';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(UserModel) private readonly userModel: ModelType<UserModel>,
    private readonly jwtservice: JwtService
  ) {}

  async createUser(dto: AuthDto) {
    const salt = await genSalt(10);
    const newUser = new this.userModel({
      email: dto.email,
      passwordHash: await hash(dto.password, salt)
    });

    return newUser.save();
  }

  async findUser(email: string) {
    return this.userModel.findOne({email}).exec();
  }


  async validateUser(email: string, password: string) {
    const user = await this.findUser(email);

    if(!user) throw new UnauthorizedException(USER_NOT_FOUND_ERR);
    const isCorrectPass = await compare(password, user.passwordHash);

    if(!isCorrectPass) throw new UnauthorizedException(PASS_NOT_MATCH_ERR);

    return {email: user.email};
  }

  async login(email: string) {
    const payload = {email}
    return {
      access_token: await this.jwtservice.signAsync(payload)
    }
  }

}
