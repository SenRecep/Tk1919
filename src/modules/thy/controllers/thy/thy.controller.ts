import { Controller, Get, Inject } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ThyService } from '../../services/thy/thy.service';

@ApiBearerAuth()
@ApiTags('thy')
@Controller('thy')
export class ThyController {
  constructor(@Inject(ThyService) private readonly thyService: ThyService) {}

  @Get('ports')
  async getPorts() {
    return await this.thyService.getPorts();
  }
}
