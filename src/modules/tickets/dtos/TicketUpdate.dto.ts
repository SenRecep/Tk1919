import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { Class } from 'src/typeorm/Ticket.entity';
export class TicketUpdateDto {
  @ApiProperty()
  @IsString()
  @MaxLength(10)
  @IsOptional()
  pnr?: string;
  @ApiProperty()
  @IsString()
  @MaxLength(10)
  @IsOptional()
  seatNumber?: string;
  @ApiProperty()
  @IsEnum(Class)
  @IsOptional()
  class?: Class;
  @ApiProperty()
  @IsString()
  @MaxLength(20)
  @IsOptional()
  meal?: string;
  @ApiProperty()
  @IsNumber()
  @IsOptional()
  baggage?: number;
  @ApiProperty()
  @IsNumber()
  @IsOptional()
  cabinBaggage?: number;
  @ApiProperty()
  @IsNumber()
  @IsOptional()
  passengerId?: number;
  @ApiProperty()
  @IsNumber()
  @IsOptional()
  airFlightId?: number;
}
