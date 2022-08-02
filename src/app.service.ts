import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): object {
    return { message: 'Hello TK1919 TEAM' };
  }
  getMessage(id: number): object {
    return { message: `Id is ${id}` };
  }
}
