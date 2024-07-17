import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { JwtAuthGuard } from './auth/guards/jwt.guard';
import { UserEmail } from './decorators/userEmail.decorator';


@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  getHello(@UserEmail() email: string): string {
    console.log(`${email}`);
    return this.appService.getHello();
  }
}
