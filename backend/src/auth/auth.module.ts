// backend/src/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaService } from '../prisma.service';

@Module({
  providers: [AuthService, PrismaService], // <-- Registramos PrismaService aquí
  controllers: [AuthController],
})
export class AuthModule {}

