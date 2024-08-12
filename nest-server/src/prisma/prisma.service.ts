import { Prisma, PrismaClient } from '@prisma/client';
import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  OnModuleDestroy,
  OnModuleInit,
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
    } catch (err) {
      this.handlePrismaError(err);
    }
  }

  // Prisma 에러를 처리하는 메서드
  private handlePrismaError(error: any): never {
    // Prisma 에러 코드를 확인하고, 적절한 NestJS 예외를 던짐
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      switch (error.code) {
        case 'P2002': // Unique constraint failed
          throw new ConflictException('고유 제약 조건에 실패했습니다. 중복된 데이터가 존재합니다.');
        // 다른 Prisma 오류 코드에 대한 처리 추가 가능
        default:
          throw new InternalServerErrorException('알 수 없는 데이터베이스 오류가 발생했습니다.');
      }
    }

    // PrismaClientInitializationError 등 다른 Prisma 예외 처리
    if (error instanceof Prisma.PrismaClientInitializationError) {
      throw new InternalServerErrorException('데이터베이스 연결 초기화에 실패했습니다.');
    }

    // 그 외의 예외는 일반 InternalServerError로 처리
    throw new InternalServerErrorException('요청을 처리하는 중에 오류가 발생했습니다.');
  }
}
