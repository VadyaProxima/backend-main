import { Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { RoomEntity } from 'src/rooms/entities/room.entity';

@Entity('basket')
export class BasketEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => RoomEntity, (room) => room.basket)
  rooms: RoomEntity[];
}
