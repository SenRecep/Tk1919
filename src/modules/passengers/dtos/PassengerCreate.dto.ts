import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDateString,
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  Length,
  MaxLength,
  MinLength,
  ValidateIf,
} from 'class-validator';
import { Genger } from 'src/typeorm/Passenger.entity';
export class PassengerCreateDto {
  @ApiProperty()
  @IsString()
  @MaxLength(45)
  @MinLength(3)
  firstName: string;
  @ApiProperty()
  @IsString()
  @MaxLength(45)
  @MinLength(2)
  lastName: string;
  @ApiProperty()
  @IsString()
  @MaxLength(45)
  @IsEmail()
  email: string;
  @ApiProperty()
  @IsString()
  @MaxLength(45)
  @MinLength(2)
  phoneNumber: string;
  @ApiProperty()
  @IsString()
  @MaxLength(45)
  @IsOptional()
  spp: string;
  @ApiProperty()
  @IsBoolean()
  isTurkish: boolean;
  @ApiProperty()
  @IsDateString()
  birthDay: Date;
  @ApiProperty()
  @IsEnum(Genger)
  gender: Genger;
  @ApiProperty()
  @ValidateIf((o) => o.isTurkish)
  @IsString()
  @Length(11)
  identityNumber: string;
  userId: number;
}
