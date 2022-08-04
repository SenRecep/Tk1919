import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Inject,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  UseFilters,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { HttpExceptionFilter } from 'src/filters/HttpException.filter';
import { Public } from 'src/modules/auth/guards/Public.guard';
import { CreateUserDto } from '../../dto/CreateUser.dto';
import { UsersService } from '../../services/users/users.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(
    @Inject('UsersService') private readonly userService: UsersService,
  ) {}

  @ApiBearerAuth()
  @UseInterceptors(ClassSerializerInterceptor)
  @Get('')
  getUsers() {
    return this.userService.getUsers();
  }

  @ApiBearerAuth()
  @UseInterceptors(ClassSerializerInterceptor)
  @UseFilters(HttpExceptionFilter)
  @Get(':id')
  async getUserById(@Param('id', ParseIntPipe) id: number) {
    const user = await this.userService.findById(id);
    if (!user) throw new NotFoundException();
    return user;
  }

  @ApiBody({ type: CreateUserDto })
  @Public()
  @Post()
  @UsePipes(ValidationPipe)
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }
}
