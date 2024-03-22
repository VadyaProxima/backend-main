import { Module } from '@nestjs/common';
import { Basket1Service } from './basket1.service';
import { Basket1Controller } from './basket1.controller';

@Module({
  controllers: [Basket1Controller],
  providers: [Basket1Service],
})
export class Basket1Module {}
