import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
  Validate,
} from 'class-validator';
import { PasswordValidation } from 'class-validator-password-check';
import { PasswordRequirement } from 'src/utils/passwordRequirement';

export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  firstName: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  lastName: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(36)
  @Validate(PasswordValidation, [PasswordRequirement])
  @ApiProperty()
  password: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;
}
