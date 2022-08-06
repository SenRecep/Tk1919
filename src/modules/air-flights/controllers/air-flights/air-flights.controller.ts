import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseFilters,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { HttpExceptionFilter } from 'src/filters/HttpException.filter';
import { AirFlightCreateDto } from '../../dtos/AirFlightCreate.dto';
import { AirFlightUpdateDto } from '../../dtos/AirFlightUpdate.dto';
import { AirFlightsService } from '../../services/air-flights/air-flights.service';
@ApiBearerAuth()
@ApiTags('air-flights')
@Controller('air-flights')
export class AirFlightsController {
  constructor(
    @Inject(AirFlightsService)
    private readonly airFlightsService: AirFlightsService,
  ) {}

  @Get()
  getAll() {
    return this.airFlightsService.getAllWhitoutDeleted();
  }

  @Get(':id')
  @UseFilters(HttpExceptionFilter)
  async getById(@Param('id', ParseIntPipe) id: number) {
    const found = await this.airFlightsService.getByIdAsync(id);
    if (!found) throw new NotFoundException('Air Flight not found');
    return found;
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.airFlightsService.deleteAsync(id);
  }
  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() airFlightUpdateDto: AirFlightUpdateDto,
  ) {
    return this.airFlightsService.updateAsync(id, airFlightUpdateDto);
  }

  @ApiBody({ type: AirFlightCreateDto })
  @Post()
  @UsePipes(ValidationPipe)
  createUser(@Body() airFlightCreateDto: AirFlightCreateDto) {
    return this.airFlightsService.createAsync(airFlightCreateDto);
  }
}
