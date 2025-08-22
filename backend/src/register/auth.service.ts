import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

@Injectable()
export class AuthService {
  async validateUser(username: string, password: string): Promise<boolean> {
    const user = await prisma.user.findUnique({
      where: { username },
    });

    if (!user) {
      return false; 
    }

    return user.password === password; 
  }
}
