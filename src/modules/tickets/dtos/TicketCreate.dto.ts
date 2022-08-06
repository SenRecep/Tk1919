import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsString, MaxLength } from 'class-validator';
import { Class } from 'src/typeorm/Ticket.entity';
export class TicketCreateDto {
  @ApiProperty()
  @IsString()
  @MaxLength(10)
  pnr: string;
  @ApiProperty()
  @IsString()
  @MaxLength(10)
  seatNumber: string;
  @ApiProperty()
  @IsEnum(Class)
  class: Class;
  @ApiProperty()
  @IsString()
  @MaxLength(20)
  meal: string;
  @ApiProperty()
  @IsNumber()
  baggage: number;
  @ApiProperty()
  @IsNumber()
  cabinBaggage: number;
  @ApiProperty()
  @IsNumber()
  passengerId: number;
  @ApiProperty()
  @IsNumber()
  airFlightId: number;
}
