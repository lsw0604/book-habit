import { PrismaClient, Prisma } from '@prisma/client';
import {
  Injectable,
  OnModuleDestroy,
  OnModuleInit,
  InternalServerErrorException,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  constructor() {
    super({
      datasources: {
        db: {
          url: process.env.DATABASE_URL,
        },
      },
    });
  }

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }

  // 확장된 메서드: Prisma 쿼리 실행 시 예외 처리 포함
  async executeQuery<T>(action: () => Promise<T>): Promise<T> {
    try {
      return await action();
    } catch (error) {
      this.handlePrismaError(error);
    }
  }

  // Prisma 에러를 처리하는 메서드
  private handlePrismaError(error: any): never {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      // Prisma 오류 코드에 따른 처리
      switch (error.code) {
        case 'P2002':
          throw new ConflictException('고유 제약 조건에 실패했습니다: ' + error.meta?.target);
        case 'P2003':
          throw new BadRequestException('외래 키 제약 조건에 실패했습니다.');
        case 'P2004':
          throw new BadRequestException('제약 조건에 맞지 않는 쿼리입니다.');
        case 'P2005':
          throw new BadRequestException('잘못된 값이 제공되었습니다.');
        // 추가적인 Prisma 오류 코드 처리 가능
        default:
          throw new InternalServerErrorException('알 수 없는 데이터베이스 오류가 발생했습니다.');
      }
    } else if (error instanceof Prisma.PrismaClientInitializationError) {
      // 초기화 오류 처리
      throw new InternalServerErrorException('데이터베이스 연결 초기화에 실패했습니다.');
    } else if (error instanceof Prisma.PrismaClientRustPanicError) {
      // Rust 패닉 처리
      throw new InternalServerErrorException(
        '데이터베이스 클라이언트에서 치명적인 오류가 발생했습니다.',
      );
    } else if (error instanceof Prisma.PrismaClientValidationError) {
      // Validation 오류 처리
      throw new BadRequestException('잘못된 입력이 제공되었습니다.');
    }

    // 그 외의 예외는 일반 InternalServerError로 처리
    throw new InternalServerErrorException('요청을 처리하는 중에 오류가 발생했습니다.');
  }
}
