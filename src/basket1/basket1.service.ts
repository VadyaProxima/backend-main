import { Injectable } from '@nestjs/common';
import { CreateBasket1Dto } from './dto/create-basket1.dto';
import { UpdateBasket1Dto } from './dto/update-basket1.dto';

@Injectable()
export class Basket1Service {
  create(createBasket1Dto: CreateBasket1Dto) {
    return 'This action adds a new basket1';
  }

  findAll() {
    return `This action returns all basket1`;
  }

  findOne(id: number) {
    return `This action returns a #${id} basket1`;
  }

  update(id: number, updateBasket1Dto: UpdateBasket1Dto) {
    return `This action updates a #${id} basket1`;
  }

  remove(id: number) {
    return `This action removes a #${id} basket1`;
  }
}
