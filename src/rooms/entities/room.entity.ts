import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { CategoryEntity } from 'src/category/entities/category.entity';
import { BasketEntity } from 'src/basket1/entities/basket1.entity';
import { ApiHideProperty } from '@nestjs/swagger';

@Entity('room')
export class RoomEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  image: string;

  @Column()
  type: string;

  @Column()
  peoples: number;

  @Column()
  square: number;

  @ManyToOne(() => CategoryEntity, (category) => category.rooms, {
    eager: true,
  })
  @JoinColumn()
  category: CategoryEntity;

  @ManyToOne(() => BasketEntity, (basket) => basket.rooms)
  basket: BasketEntity; // This should not be an array
}
