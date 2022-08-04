import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Inject,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import {
  LocalGuard,
  AuthanticatedGuard,
} from 'src/modules/auth/guards/Local.guard';
import { UserListDto } from 'src/modules/users/dto/UserList.dto';
import { UsersService } from 'src/modules/users/services/users/users.service';
import { LoginDto } from '../../dto/Login.dto';
import { Public } from '../../guards/Public.guard';
import { AuthService } from '../../services/auth/auth.service';
import { Introspec } from '../../types/Introspec';
import { JwtToken } from '../../types/JwtToken';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    @Inject('AuthService') private readonly authService: AuthService,
    @Inject('UsersService') private readonly userService: UsersService,
  ) {}

  @Public()
  @UseGuards(LocalGuard)
  @Post('login')
  @ApiBody({ type: LoginDto })
  async login(@Req() req: Request) {
    return this.authService.login(req.user);
  }
  @ApiBody({ type: JwtToken })
  @Public()
  @Post('verify')
  verify(@Body() jwtToken: JwtToken) {
    const value = this.authService.verify(jwtToken);
    return new Introspec(value);
  }

  @ApiBearerAuth()
  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(AuthanticatedGuard)
  @Get()
  async getAuthStatus(@Req() req: Request) {
    const loginUser = new UserListDto(req.user);
    const user = await this.userService.findById(loginUser.id);
    return user;
  }
}
