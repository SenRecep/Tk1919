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
  Req,
  UseFilters,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { HttpExceptionFilter } from 'src/filters/HttpException.filter';
import { PassengerCreateDto } from '../../dtos/PassengerCreate.dto';
import { PassengerUpdateDto } from '../../dtos/PassengerUpdate.dto';
import { PassengersService } from '../../services/passengers/passengers.service';
@ApiBearerAuth()
@ApiTags('passengers')
@Controller('passengers')
export class PassengersController {
  constructor(
    @Inject(PassengersService)
    private readonly passengersService: PassengersService,
  ) {}

  @Get()
  getAll(@Req() req: Request) {
    const userId = req.user['id'];
    return this.passengersService.getAllWhitoutDeleted(userId);
  }

  @Get(':id')
  @UseFilters(HttpExceptionFilter)
  async getById(@Param('id', ParseIntPipe) id: number) {
    const found = await this.passengersService.getByIdAsync(id);
    if (!found) throw new NotFoundException('Post not found');
    return found;
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.passengersService.deleteAsync(id);
  }
  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() passengerUpdateDto: PassengerUpdateDto,
  ) {
    return this.passengersService.updateAsync(id, passengerUpdateDto);
  }

  @ApiBody({ type: PassengerCreateDto })
  @Post()
  @UsePipes(ValidationPipe)
  createUser(
    @Body() passengerCreateDto: PassengerCreateDto,
    @Req() req: Request,
  ) {
    passengerCreateDto.userId = req.user['id'];
    return this.passengersService.createAsync(passengerCreateDto);
  }
}
