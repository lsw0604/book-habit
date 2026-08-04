import { Gender } from '@prisma/client';
import { Type } from 'class-transformer';
import { IsDate, IsEmail, IsEnum, IsNotEmpty, IsString, MinLength, MaxLength } from 'class-validator';

/**
 * 회원가입 요청 DTO
 */
export class AuthRegisterDto {
  @IsString()
  @IsEmail({}, { message: '올바른 이메일 형식이 아닙니다.' })
  @IsNotEmpty({ message: '이메일을 입력해 주세요.' })
  email: string;

  @IsString()
  @IsNotEmpty({ message: '비밀번호를 입력해 주세요.' })
  @MinLength(6, { message: '비밀번호는 최소 6자 이상이어야 합니다.' })
  @MaxLength(100, { message: '비밀번호는 최대 100자까지 가능합니다.' })
  password: string;

  @IsEnum(Gender, { message: '올바른 성별 타입을 선택해 주세요.' })
  @IsNotEmpty()
  gender: Gender;

  @IsDate()
  @Type(() => Date)
  @IsNotEmpty()
  birthday: Date;

  @IsString()
  @IsNotEmpty({ message: '이름을 입력해 주세요.' })
  @MinLength(2, { message: '이름은 최소 2자 이상이어야 합니다.' })
  name: string;
}

/**
 * 로그인 요청 DTO (Request Body 유효성 검증용)
 */
export class AuthSignInDto {
  @IsString()
  @IsEmail({}, { message: '올바른 이메일 형식이 아닙니다.' })
  @IsNotEmpty({ message: '이메일을 입력해 주세요.' })
  email: string;

  @IsString()
  @IsNotEmpty({ message: '비밀번호를 입력해 주세요.' })
  password: string;
}
