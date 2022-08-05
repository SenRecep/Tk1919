import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('passengers')
@Controller('passengers')
export class PassengersController {
  @Get()
  getHello(): string {
    return 'Hello World!';
  }
}
