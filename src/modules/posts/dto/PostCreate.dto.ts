import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNotEmptyObject,
  IsString,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { AddressCreateDto } from './AddressCreate.dto';

export class PostCreateDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  title: string;
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @ApiProperty()
  content: string;
  @ApiProperty()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => AddressCreateDto)
  address: AddressCreateDto;
  userId?: number = null;
}
