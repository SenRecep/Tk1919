import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('air-flights')
@Controller('air-flights')
export class AirFlightsController {
  @Get()
  getHello(): string {
    return 'Hello World!';
  }
}
