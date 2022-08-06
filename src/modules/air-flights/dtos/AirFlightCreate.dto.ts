import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsNumber,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class AirFlightCreateDto {
  @ApiProperty()
  @IsDateString()
  arrival: Date;
  @ApiProperty()
  @IsDateString()
  departure: Date;
  @ApiProperty()
  @IsString()
  @MaxLength(45)
  @MinLength(2)
  from: string;
  @ApiProperty()
  @IsString()
  @MaxLength(45)
  @MinLength(2)
  to: string;
  @ApiProperty()
  @IsNumber()
  price: number;
  @ApiProperty()
  @IsNumber()
  capacity: number;
  @ApiProperty()
  @IsString()
  @MaxLength(45)
  @MinLength(2)
  duration: string;
}
