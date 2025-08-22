// backend/src/auth/auth.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body('username') username: string, @Body('password') password: string) {
    const isValid = await this.authService.validateUser(username, password);
    return { success: isValid, message: isValid ? 'Login exitoso' : 'Credenciales inválidas' };
  }

  @Post('register')
  async register(@Body() data: { username: string; password: string }) {
    const user = await this.authService.registerUser(data);
    return { success: true, user };
  }
}
