import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
  Validate,
} from 'class-validator';
import { PasswordValidation } from 'class-validator-password-check';
import { PasswordRequirement } from 'src/utils/passwordRequirement';

export class UpdateUserDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @IsOptional()
  firstName?: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @IsOptional()
  lastName?: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(36)
  @Validate(PasswordValidation, [PasswordRequirement])
  @IsOptional()
  password?: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @IsOptional()
  email?: string;
}
