import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { PrismaService } from '../prisma.service';

@Controller('auth')
export class AuthController {
  private authService: AuthService;

  constructor(private prisma: PrismaService) {
    this.authService = AuthService.getInstance(prisma);
  }

  @Post('register')
  async register(@Body() data: RegisterDto) {
    return this.authService.registerUser(data);
  }

  @Post('login')
  async login(@Body() data: LoginDto) {
    return this.authService.validateUser(data.email, data.password);
  }
}

