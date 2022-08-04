import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString, MinLength, ValidateNested } from 'class-validator';
import { AddressUpdateDto } from './AddressUpdate.dto';

export class PostUpdateDto {
  @ApiProperty()
  @IsString()
  @MinLength(3)
  title?: string;
  @ApiProperty()
  @IsString()
  @MinLength(5)
  content?: string;
  @ApiProperty()
  @ValidateNested()
  @Type(() => AddressUpdateDto)
  address?: AddressUpdateDto;
}
