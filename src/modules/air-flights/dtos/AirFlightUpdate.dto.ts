import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class AirFlightUpdateDto {
  @ApiProperty()
  @IsDateString()
  @IsOptional()
  arrival?: Date;
  @ApiProperty()
  @IsDateString()
  @IsOptional()
  departure?: Date;
  @ApiProperty()
  @IsString()
  @MaxLength(45)
  @MinLength(2)
  @IsOptional()
  from?: string;
  @ApiProperty()
  @IsString()
  @MaxLength(45)
  @MinLength(2)
  @IsOptional()
  to?: string;
  @ApiProperty()
  @IsNumber()
  @IsOptional()
  price?: number;
  @ApiProperty()
  @IsNumber()
  @IsOptional()
  capacity?: number;
  @ApiProperty()
  @IsString()
  @MaxLength(45)
  @MinLength(2)
  @IsOptional()
  duration?: string;
}
