import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class AuthService {
  private static instance: AuthService;

  private constructor(private prisma: PrismaService) {}

  static getInstance(prisma: PrismaService): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService(prisma);
    }
    return AuthService.instance;
  }

  async registerUser(data: { email: string; password: string }) {
    return this.prisma.user.create({ data });
  }

  async validateUser(email: string, password: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (user && user.password === password) {
      return user;
    }
    return null;
  }
}

