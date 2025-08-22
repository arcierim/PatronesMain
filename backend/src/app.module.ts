import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [AuthModule], // Importamos el módulo de autenticación
})
export class AppModule {}

