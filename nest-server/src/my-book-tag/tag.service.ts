import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTagPayload, FindTagPayload, DeleteTagPayload } from './types/tag';

@Injectable()
export class TagService {
  constructor(private readonly prismaService: PrismaService) {}

  /**
   * * 태그를 생성합니다. 이미 존재하는 태그인 경우 기본 태그를 반환합니다.
   * @param {CreateTagPayload} payload - 생성할 태그 정보
   * @param {string} payload.tag - 생성할 태그 이름
   * @returns {Promise<Tag>} - 생성된 태그 정보 또는 기본 태그 정보
   */
  async createTag(payload: CreateTagPayload) {
    const existTag = await this.prismaService.tag.findUnique({ where: { tag: payload.tag } });

    if (!existTag) return await this.prismaService.tag.create({ data: { tag: payload.tag } });

    return existTag;
  }

  /**
   * * 태그를 조회합니다. 태그의 ID 또는 태그 명으로 조회할 수 있습니다.
   * @param {FindTagPayload} payload - 조회할 태그 정보
   * @param {number} [payload.id] - 태그 ID
   * @param {string} [payload.tag] - 태그 명
   * @returns {Promise<Tag>} 조회된 태그
   * @throws {NotFoundException} 태그를 찾을 수 없는 경우
   */
  async findTag(payload: FindTagPayload) {
    const existTag = await this.prismaService.tag.findUnique({
      where: {
        id: payload.id,
        tag: payload.tag,
      },
    });

    if (!existTag) throw new NotFoundException('해당 태그를 찾을 수 없습니다.');

    return existTag;
  }

  /**
   * * 태그를 삭제합니다. 태그의 ID로 삭제합니다.
   * @param {DeleteTagPayload} payload - 삭제할 태그 정보
   * @param {number} payload.id - 삭제할 태그의 ID
   * @returns {Promise<Tag>} 삭제된 태그
   * @throws {NotFoundException} 태그를 찾을 수 없는 경우
   */
  async deleteTag(payload: DeleteTagPayload) {
    const existTag = await this.findTag({ id: payload.id });

    return await this.prismaService.tag.delete({
      where: {
        id: existTag.id,
      },
    });
  }
}
