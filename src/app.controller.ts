import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  get(): object {
    return this.appService.getHello();
  }
  @Get('/:id')
  getById(@Param('id', ParseIntPipe) id: number): object {
    return this.appService.getMessage(id);
  }
}
