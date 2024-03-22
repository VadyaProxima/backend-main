import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ConfigModule, ConfigService } from '@nestjs/config';
import { getPostgresConfig } from './configs/postgres.config';
import { CategoryModule } from './category/category.module';
import { RoomModule } from './rooms/room.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { Basket1Module } from './basket1/basket1.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getPostgresConfig,
    }),
    CategoryModule,
    RoomModule,
    UsersModule,
    AuthModule,
    Basket1Module,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
