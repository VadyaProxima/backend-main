import { BadRequestException, Injectable } from '@nestjs/common';
import { DeleteResult, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as fs from 'fs';

import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { RoomEntity } from './entities/room.entity';
import { CategoryEntity } from 'src/category/entities/category.entity';

@Injectable()
export class RoomService {
  constructor(
    @InjectRepository(RoomEntity)
    private roomRepository: Repository<RoomEntity>,

    @InjectRepository(CategoryEntity)
    private categoryRepository: Repository<CategoryEntity>,
  ) {}

  async create(
    dto: CreateRoomDto,
    image: Express.Multer.File,
  ): Promise<RoomEntity> {
    const existingCategory = await this.categoryRepository.findOne({
      where: { id: dto.categoryId },
      relations: ['rooms'],
    });

    if (!existingCategory) {
      throw new BadRequestException(
        `Category with id=${dto.categoryId} not found`,
      );
    }

    const room = new RoomEntity();
    room.image = image.filename;
    room.type = dto.type;
    room.square = dto.square;
    room.peoples = dto.peoples;

    const newRoom = await this.roomRepository.save(room);

    existingCategory.rooms.push(room);
    await this.categoryRepository.save(existingCategory);

    return newRoom;
  }

  async findAll(): Promise<RoomEntity[]> {
    return this.roomRepository.find();
  }

  async findOne(id: number): Promise<RoomEntity> {
    return this.roomRepository.findOneBy({ id });
  }

  async findByCategoryId(categoryId: number): Promise<RoomEntity[]> {
    return this.roomRepository
      .createQueryBuilder('room')
      .leftJoinAndSelect('room.category', 'category')
      .where('room.categoryId = :categoryId', { categoryId })
      .getMany();
  }

  async update(
    id: number,
    dto: UpdateRoomDto,
    image: Express.Multer.File,
  ): Promise<RoomEntity> {
    const toUpdate = await this.roomRepository.findOneBy({ id });
    if (!toUpdate) {
      throw new BadRequestException(`Записи с id=${id} не найдено`);
    }

    if (dto.type) toUpdate.type = dto.type;
    if (dto.square) toUpdate.square = dto.square;
    if (dto.peoples) toUpdate.peoples = dto.peoples;
    if (dto.categoryId) {
      const category = await this.categoryRepository.findOne({
        where: { id: dto.categoryId },
        relations: ['rooms'],
      });

      if (!category) {
        throw new BadRequestException(
          `Category with id=${dto.categoryId} not found`,
        );
      }

      toUpdate.category = category;
    }

    if (image) {
      if (toUpdate.image !== image.filename) {
        fs.unlink(`db_images/room/${toUpdate.image}`, (err) => {
          if (err) {
            console.error(err);
          }
        });
        toUpdate.image = image.filename;
      }
    }

    return this.roomRepository.save(toUpdate);
  }
  async delete(id: number): Promise<DeleteResult> {
    return this.roomRepository.delete(id);
  }
}
