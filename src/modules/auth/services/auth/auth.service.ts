import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/modules/users/services/users/users.service';
import { comparePassword } from 'src/utils/bcrypt';
import { JwtToken } from '../../types/JwtToken';

@Injectable()
export class AuthService {
  constructor(
    @Inject('UsersService') private readonly usersService: UsersService,
    @Inject(JwtService) private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const userDb = await this.usersService.findByUserEmail(email);
    if (!userDb) return null;
    const matched = comparePassword(password, userDb.password);
    if (!matched) return null;
    return userDb;
  }
  async login(user: any) {
    const payload = { email: user.email, sub: user.id };
    const token = this.jwtService.sign(payload);
    const jwtToken = new JwtToken();
    jwtToken.access_token = token;
    return jwtToken;
  }
  verify(jwtToken: JwtToken): boolean {
    try {
      this.jwtService.verify(jwtToken.access_token);
      return true;
    } catch (err) {
      return false;
    }
  }
}
