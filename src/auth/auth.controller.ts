import { BadRequestException, Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { ALREADY_REGISTERED_ERR } from './auth.constants';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() dto: AuthDto) {
    const oldusr = await this.authService.findUser(dto.email);

    if(oldusr) throw new BadRequestException(ALREADY_REGISTERED_ERR);

    return this.authService.createUser(dto);
  }

  @Post('login')
  async login(@Body() dto: AuthDto) {
    return 'hello worl'
  }
}
