// backend/src/auth/auth.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import * as bcrypt from 'bcrypt';

interface RegisterDto {
  username: string;
  password: string;
}

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async registerUser(data: RegisterDto) {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    return this.prisma.user.create({
      data: {
        username: data.username,
        password: hashedPassword,
      },
    });
  }

  async validateUser(username: string, password: string) {
    const user = await this.prisma.user.findFirst({ where: { username } });
    if (!user) return false;
    return await bcrypt.compare(password, user.password);
  }
}
