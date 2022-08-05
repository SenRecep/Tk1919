import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('tickets')
@Controller('tickets')
export class TicketsController {
  @Get()
  getHello(): string {
    return 'Hello World!';
  }
}
