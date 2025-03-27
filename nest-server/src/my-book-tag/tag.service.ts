import type {
  CreateTagPayload,
  FindTagPayload,
  DeleteTagPayload,
  ResponseTag,
} from './interface/tag.interface';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TagService {
  constructor(private readonly prismaService: PrismaService) {}

  /**
   * * 태그를 생성합니다. 이미 존재하는 태그인 경우 기본 태그를 반환합니다.
   * @param {CreateTagPayload} payload - 생성할 태그 정보
   * @param {string} payload.value - 생성할 태그 값값
   * @returns {Promise<ResponseTag>} - 생성된 태그 정보 또는 기본 태그 정보
   */
  public async createTag(payload: CreateTagPayload): Promise<ResponseTag> {
    const existTag: ResponseTag = await this.prismaService.tag.findUnique({
      where: { value: payload.value },
    });

    if (!existTag) return await this.prismaService.tag.create({ data: { value: payload.value } });

    return existTag;
  }

  /**
   * * 태그를 조회합니다. 태그의 ID 또는 태그 명으로 조회할 수 있습니다.
   * @param {FindTagPayload} payload - 조회할 태그 정보
   * @param {number} [payload.id] - 태그 ID
   * @param {string} [payload.value] - 태그 값값
   * @returns {Promise<ResponseTag>} 조회된 태그
   * @throws {NotFoundException} 태그를 찾을 수 없는 경우
   * @throws {BadRequestException} 태그 ID, VALUE값이 없는 경우
   */
  public async findTag(payload: FindTagPayload): Promise<ResponseTag> {
    if (!payload.id && !payload.value) {
      throw new BadRequestException('태그 ID 또는 태그 VALUE가 필요합니다.');
    }

    const whereCondition: Prisma.TagWhereInput = {};
    if (payload.id) whereCondition.id = payload.id;
    if (payload.value) whereCondition.value = payload.value;

    const existTag: ResponseTag = await this.prismaService.tag.findFirst({
      where: whereCondition,
    });

    if (!existTag) throw new NotFoundException('해당 태그를 찾을 수 없습니다.');

    return existTag;
  }

  /**
   * * 태그를 삭제합니다. 태그의 ID로 삭제합니다.
   * @param {DeleteTagPayload} payload - 삭제할 태그 정보
   * @param {number} payload.id - 삭제할 태그의 ID
   * @returns {Promise<ResponseTag>} 삭제된 태그
   * @throws {NotFoundException} 태그를 찾을 수 없는 경우
   */
  public async deleteTag(payload: DeleteTagPayload): Promise<ResponseTag> {
    const existTag: ResponseTag = await this.findTag({ id: payload.id });

    const deletedTag: ResponseTag = await this.prismaService.tag.delete({
      where: {
        id: existTag.id,
      },
    });

    return deletedTag;
  }
}
