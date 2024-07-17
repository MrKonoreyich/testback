import { BadRequestException, Body, Controller, HttpCode, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { ALREADY_REGISTERED_ERR } from './auth.constants';
3
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UsePipes(new ValidationPipe())
  @Post('register')
  async register(@Body() dto: AuthDto) {
    const oldusr = await this.authService.findUser(dto.email);

    if(oldusr) throw new BadRequestException(ALREADY_REGISTERED_ERR);

    return this.authService.createUser(dto);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('login')
  async login(@Body() { email,password }: AuthDto) {
    const user = await this.authService.validateUser(email, password);
    return this.authService.login(email)
  }
}
