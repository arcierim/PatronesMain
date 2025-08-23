import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import * as bcrypt from 'bcrypt';

interface RegisterDto {
  username: string;
  password: string;
}

@Injectable()
export class AuthService {
  private static instance: AuthService;   //  única instancia
  private constructor(private prisma: PrismaService) {} //  constructor privado

  //  Método Singleton
  static getInstance(prisma: PrismaService): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService(prisma);
    }
    return AuthService.instance;
  }

  async registerUser(data: RegisterDto) {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    return this.prisma.user.create({
      data: {
        username: data.username,
        password: hashedPassword,
      },
    });
  }
