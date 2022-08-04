import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, Max, Min } from 'class-validator';

export class AddressUpdateDto {
  @ApiProperty()
  @IsNumber()
  @Min(-90)
  @Max(90)
  latitude?: number;
  @ApiProperty()
  @IsNumber()
  @Min(-181)
  @Max(181)
  longitude?: number;
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  address?: string;
}
