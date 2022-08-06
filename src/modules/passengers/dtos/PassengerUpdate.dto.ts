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
} from 'class-validator';
import { Genger } from 'src/typeorm/Passenger.entity';
export class PassengerUpdateDto {
  @ApiProperty()
  @IsString()
  @MaxLength(45)
  @MinLength(3)
  @IsOptional()
  firstName?: string;
  @ApiProperty()
  @IsString()
  @MaxLength(45)
  @MinLength(2)
  @IsOptional()
  lastName?: string;
  @ApiProperty()
  @IsString()
  @MaxLength(45)
  @IsEmail()
  @IsOptional()
  email?: string;
  @ApiProperty()
  @IsString()
  @MaxLength(45)
  @MinLength(2)
  @IsOptional()
  phoneNumber?: string;
  @ApiProperty()
  @IsString()
  @MaxLength(45)
  @IsOptional()
  spp?: string;
  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  isTurkish?: boolean;
  @ApiProperty()
  @IsDateString()
  @IsOptional()
  birthDay?: Date;
  @ApiProperty()
  @IsEnum(Genger)
  @IsOptional()
  gender?: Genger;
  @ApiProperty()
  @IsString()
  @Length(11)
  @IsOptional()
  identityNumber?: string;
}
