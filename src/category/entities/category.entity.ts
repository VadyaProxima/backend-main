import { ApiHideProperty } from '@nestjs/swagger';
import { RoomEntity } from 'src/rooms/entities/room.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('category')
export class CategoryEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  // @CreateDateColumn({ type: 'timestamp' })
  // createdAt: Date;

  @ApiHideProperty()
  @OneToMany(() => RoomEntity, (room) => room.category)
  rooms: RoomEntity[];
}
