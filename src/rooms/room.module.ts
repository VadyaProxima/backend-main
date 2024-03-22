import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { RoomService } from './room.service';
import { RoomController } from './room.controller';
import { RoomEntity } from './entities/room.entity';

import { CategoryModule } from 'src/category/category.module';
import { CategoryEntity } from 'src/category/entities/category.entity';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([RoomEntity, CategoryEntity]),
    CategoryModule,
  ],
  controllers: [RoomController],
  providers: [RoomService],
})
export class RoomModule {}
