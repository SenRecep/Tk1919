import { HttpService } from '@nestjs/axios';
import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cache } from 'cache-manager';
import { map } from 'rxjs';
import { stringToDate, timeDiffCalc } from 'src/utils/datetimeHelper';
import { priceCalculator } from 'src/utils/priceCalculator';
import { SearchFlightByDateDto } from '../../dtos/SearchFlightByDate.dto';
export const CACHE_KEY_PORTS = 'ports';

@Injectable()
export class ThyService {
  constructor(
    @Inject(HttpService)
    private readonly httpService: HttpService,
    @Inject(ConfigService)
    private readonly config: ConfigService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}
  async getPorts() {
    const value = await this.cacheManager.get(CACHE_KEY_PORTS);
    if (value && Array.isArray(value)) return value;

    const data = {
      requestHeader: {
        clientUsername: 'OPENAPI',
        clientTransactionId: 'CLIENT_TEST_1',
        channel: 'WEB',
        languageCode: 'TR',
        airlineCode: 'TK',
      },
    };
    return this.httpService
      .post('/getPortList', data)
      .pipe(map((res) => res.data))
      .pipe(map((res) => res.data.Port))
      .pipe(
        map((res) =>
          res.map((x) => {
            const lang = x.LanguageInfo?.Language;
            let name = lang;
            if (Array.isArray(lang)) name = name.at(0);
            return {
              Code: x.Code,
              Name: name?.Name,
            };
          }),
        ),
      )
      .pipe(map((res) => res.filter((x) => x.Name)))
      .pipe(
        map((res) => {
          this.cacheManager.set(CACHE_KEY_PORTS, res);
          return res;
        }),
      );
  }
  searchFlightByDate(data: SearchFlightByDateDto) {
    return this.httpService
      .post('/aodb-rest/searchFlightByDate', data)
      .pipe(map((res) => res.data))
      .pipe(map((res) => res.data))
      .pipe(
        map((res) => {
          if (Array.isArray(res)) return res;
          throw new Error('No data found');
        }),
      )
      .pipe(
        map((res) =>
          res.map((x) => {
            const scheduledLocalArrivalDatetime = stringToDate(
              x.scheduledLocalArrivalDatetime,
            );
            const scheduledLocalDepartureDatetime = stringToDate(
              x.scheduledLocalDepartureDatetime,
            );
            return {
              price: priceCalculator(
                scheduledLocalArrivalDatetime,
                scheduledLocalDepartureDatetime,
              ),
              flightTime: timeDiffCalc(
                scheduledLocalArrivalDatetime,
                scheduledLocalDepartureDatetime,
              ),
              scheduledDepartureAirport: x.scheduledDepartureAirport,
              scheduledArrivalAirport: x.scheduledArrivalAirport,
              scheduledLocalArrivalDatetime: x.scheduledLocalArrivalDatetime,
              scheduledLocalDepartureDatetime:
                x.scheduledLocalDepartureDatetime,
            };
          }),
        ),
      );
  }
}
