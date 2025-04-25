import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoggerService } from 'src/common/logger/logger.service';
import { Translator, Prisma } from '@prisma/client';

@Injectable()
export class TranslatorService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly logger: LoggerService,
  ) {
    this.logger.setContext(TranslatorService.name);
  }

  /**
   * * 번역가 이름으로 번역가를 찾거나, 없으면 새로 생성합니다.
   * * 트랜잭션 내에서 사용될 수 있도록 prisma 클라이언트를 인자로 받습니다.
   * @param prisma - Prisma 트랜잭션 클라이언트
   * @param name - 번역가 이름
   * @returns {Promise<Translator>} 찾거나 생성된 번역가 객체
   */
  public async findOrCreateTranslator(
    prisma: Prisma.TransactionClient,
    name: string,
  ): Promise<Translator> {
    this.logger.debug(`[Upsert] 번역가 검색 또는 생성 시도: ${name}`);

    const translator = await prisma.translator.upsert({
      where: { name }, // name이 @unique이므로 where 조건으로 사용 가능
      create: { name }, // 번역가가 없을 경우 생성될 데이터
      update: {}, // 번역가가 이미 있을 경우 업데이트할 데이터 (필요시 수정)
    });

    this.logger.debug(`[Upsert] 번역가 처리 완료: ${name} (ID: ${translator.id})`);
    return translator;
  }

  public async create(data: Prisma.TranslatorCreateInput) {
    this.logger.debug(`새 번역가 생성 요청: ${data.name}`);
    const translator = await this.prismaService.translator.create({
      data,
    });
    this.logger.debug(`새 번역가 생성 완료 ID: ${translator.id}, ${translator.name}`);
    return translator;
  }

  /**
   * * 모든 번역가 목록을 조회합니다. 페이지네이션 및 정렬 옵션을 지원합니다.
   * @param params - Prisma findMany 인자 (where, orderBy, skip, take 등)
   * @returns {Promise<Translator[]>} 번역가 목록
   */
  public async findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.TranslatorWhereUniqueInput;
    where?: Prisma.TranslatorWhereInput;
    orderBy?: Prisma.TranslatorOrderByWithRelationInput;
  }): Promise<Translator[]> {
    const { cursor, orderBy, skip, take, where } = params;

    this.logger.debug('모든 번역가 목록 조회 요청');
    return this.prismaService.translator.findMany({
      where,
      cursor,
      orderBy,
      skip,
      take,
    });
  }

  /**
   * * ID로 특정 번역가를 조회합니다.
   * @param id - 조회할 번역가 ID
   * @returns {Promise<Translator | null>} 번역가 객체 또는 null (찾지 못한 경우)
   */
  async findOneById(id: number): Promise<Translator | null> {
    this.logger.debug(`ID로 번역가 조회 요청: ${id}`);
    const translator = await this.prismaService.translator.findUnique({
      where: { id },
    });
    if (!translator) {
      this.logger.warn(`ID(${id})에 해당하는 번역가를 찾을 수 없습니다.`);
      return null;
    }
    return translator;
  }

  /**
   * * 이름으로 특정 번역가를 조회합니다.
   * @param name - 조회할 번역가 이름 (고유하다고 가정)
   * @returns {Promise<Translator | null>} 번역가 객체 또는 null (찾지 못한 경우)
   */
  async findOneByName(name: string): Promise<Translator | null> {
    this.logger.debug(`이름으로 번역가 조회 요청: ${name}`);
    const translator = await this.prismaService.translator.findUnique({
      where: { name },
    });
    if (!translator) {
      this.logger.warn(`이름(${name})에 해당하는 번역가를 찾을 수 없습니다.`);
      return null;
    }
    return translator;
  }

  /**
   * * 특정 번역가 정보를 업데이트합니다.
   * * 존재하지 않는 레코드 업데이트 시 Prisma 에러가 발생하며, 이는 전역 에러 필터에서 처리됩니다.
   * @param params - 업데이트 조건(where) 및 데이터(data)
   * @returns {Promise<Translator>} 업데이트된 번역가 객체
   */
  async update(params: {
    where: Prisma.TranslatorWhereUniqueInput;
    data: Prisma.TranslatorUpdateInput;
  }): Promise<Translator> {
    const { where, data } = params;
    const identifier = where.id ? `ID ${where.id}` : `Name ${where.name}`;
    this.logger.debug(`번역가 정보 업데이트 요청: ${identifier}`);
    const updatedTranslator = await this.prismaService.translator.update({
      where,
      data,
    });
    this.logger.debug(`번역가 정보 업데이트 완료: ${identifier}`);
    return updatedTranslator;
  }

  /**
   * * 특정 번역가를 삭제합니다.
   * * 관련된 BookTranslator 레코드가 있으면 Prisma/데이터베이스 제약 조건에 따라 실패할 수 있습니다.
   * * 존재하지 않는 레코드 삭제 시 Prisma 에러가 발생하며, 이는 전역 에러 필터에서 처리됩니다.
   * @param id - 삭제할 번역가 ID
   * @returns {Promise<Translator>} 삭제된 번역가 객체
   */
  async remove(id: number): Promise<Translator> {
    this.logger.debug(`번역가 삭제 요청: ID ${id}`);
    const deletedTranslator = await this.prismaService.translator.delete({
      where: { id },
    });
    this.logger.debug(`번역가 삭제 완료: ID ${id}`);
    return deletedTranslator;
  }
}
