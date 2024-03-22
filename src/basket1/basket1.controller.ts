import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { Basket1Service } from './basket1.service';
import { CreateBasket1Dto } from './dto/create-basket1.dto';
import { UpdateBasket1Dto } from './dto/update-basket1.dto';

@Controller('basket1')
export class Basket1Controller {
  constructor(private readonly basket1Service: Basket1Service) {}

  @Post()
  create(@Body() createBasket1Dto: CreateBasket1Dto) {
    return this.basket1Service.create(createBasket1Dto);
  }

  @Get()
  findAll() {
    return this.basket1Service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.basket1Service.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBasket1Dto: UpdateBasket1Dto) {
    return this.basket1Service.update(+id, updateBasket1Dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.basket1Service.remove(+id);
  }
}
