import { IsOptional, IsString } from 'class-validator';

export class UpdateCommentReplyDto {
  @IsString()
  @IsOptional()
  reply?: string;
}
