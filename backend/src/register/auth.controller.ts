import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(
    @Body('username') username: string,
    @Body('password') password: string,
  ) {
    const isValid = await this.authService.validateUser(username, password);

    if (!isValid) {
      return { success: false, message: 'Credenciales inválidas' };
    }

    return { success: true, message: 'Login exitoso' };
  }
}
