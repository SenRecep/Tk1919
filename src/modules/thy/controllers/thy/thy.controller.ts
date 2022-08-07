import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { SearchFlightByDateDto } from '../../dtos/SearchFlightByDate.dto';
import { ThyService } from '../../services/thy/thy.service';

@ApiBearerAuth()
@ApiTags('thy')
@Controller('thy')
export class ThyController {
  constructor(@Inject(ThyService) private readonly thyService: ThyService) {}

  @Get('ports')
  getPorts() {
    return this.thyService.getPorts();
  }
  @ApiBody({ type: SearchFlightByDateDto })
  @Post('searchFlightByDate')
  @UsePipes(ValidationPipe)
  searchFlightByDate(@Body() data: SearchFlightByDateDto) {
    return this.thyService.searchFlightByDate(data);
  }
}
