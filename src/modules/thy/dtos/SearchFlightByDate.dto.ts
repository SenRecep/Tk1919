import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class SearchFlightByDateDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  date: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  scheduledDepartureAirport: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  scheduledArrivalAirport: string;
}
