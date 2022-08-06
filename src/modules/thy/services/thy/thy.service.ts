import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ThyService {
  constructor(private readonly httpService: HttpService) {}

  async getPorts() {
    const data = {
      requestHeader: {
        clientUsername: 'OPENAPI',
        clientTransactionId: 'CLIENT_TEST_1',
        channel: 'WEB',
        languageCode: 'TR',
        airlineCode: 'TK',
      },
    };
    const response = await this.httpService
      .get('https://api.turkishairlines.com/test/getPortList', {
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          apikey: 'l7xxfc1085c600bb4ea2b5ad1ec7db1789fa',
          apisecret: 'e65ce42b101546699108807e4c774757',
        },
        data: JSON.stringify(data),
      })
      .toPromise()
      .then((res) => res.data)
      .then((res) => res.data.Port);
    const result = response
      .map((x) => {
        const lang = x.LanguageInfo?.Language;
        let name = lang;
        if (Array.isArray(lang)) name = name[0];
        return {
          Code: x.Code,
          Name: name?.Name,
        };
      })
      .filter((x) => x.Name);
    return result;
  }
}
