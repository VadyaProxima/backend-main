import { PartialType } from '@nestjs/swagger';
import { CreateBasket1Dto } from './create-basket1.dto';

export class UpdateBasket1Dto extends PartialType(CreateBasket1Dto) {}
