/* eslint-disable @typescript-eslint/no-inferrable-types */
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsNumberString } from 'class-validator';

export class CreateRoomDto {
  @ApiProperty({
    type: 'file',
    properties: {
      file: {
        type: 'string',
        format: 'binary',
      },
    },
  })
  image: Express.Multer.File;

  @IsString()
  type: string = 'терасса';

  @IsNumberString()
  peoples: number;

  @IsNumberString()
  square: number;

  @IsNumberString()
  categoryId: number;
}
