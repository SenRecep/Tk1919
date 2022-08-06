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
import { TicketCreateDto } from '../../dtos/TicketCreate.dto';
import { TicketUpdateDto } from '../../dtos/TicketUpdate.dto';
import { TicketsService } from '../../services/tickets/tickets.service';
@ApiBearerAuth()
@ApiTags('tickets')
@Controller('tickets')
export class TicketsController {
  constructor(
    @Inject(TicketsService)
    private readonly ticketsService: TicketsService,
  ) {}

  @Get()
  getAll() {
    return this.ticketsService.getAllWhitoutDeleted();
  }

  @Get(':id')
  @UseFilters(HttpExceptionFilter)
  async getById(@Param('id', ParseIntPipe) id: number) {
    const found = await this.ticketsService.getByIdAsync(id);
    if (!found) throw new NotFoundException('Ticket not found');
    return found;
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.ticketsService.deleteAsync(id);
  }
  @Put(':id')
  @UseFilters(HttpExceptionFilter)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() ticketUpdateDto: TicketUpdateDto,
  ) {
    return this.ticketsService.updateAsync(id, ticketUpdateDto);
  }

  @ApiBody({ type: TicketCreateDto })
  @Post()
  @UsePipes(ValidationPipe)
  @UseFilters(HttpExceptionFilter)
  createUser(@Body() ticketCreateDto: TicketCreateDto) {
    return this.ticketsService.createAsync(ticketCreateDto);
  }
}
