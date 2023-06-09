import { BadRequestException } from '@nestjs/common';
import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class SignUpDto {
  // obj는 현재 속성(name)이 속해있는 객체(SignUpDto)를 가리킨다.
  @Transform(({ value, obj }) => {
    if(obj.password.includes(obj.name.trim())) {
      throw new BadRequestException('password는 name과 같은 문자열을 포함할 수 없습니다.');
    }
    return value.trim();
  })
  @IsString()
  @MinLength(2)
  @MaxLength(30)
  readonly name: string;

  @IsString()
  @IsEmail()
  @MaxLength(60)
  readonly email: string;

  @IsString()
  @Matches(/^[A-Za-z\d!@#$%^&*()]{8,30}$/)
  readonly password: string;
}
