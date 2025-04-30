import { Body, Controller, Patch, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { AccessGuard } from 'src/auth/guard/access.guard';
import { UserDecorator } from 'src/common/decorator/user.decorator';
import { ResponseDto } from 'src/common/dto/response.dto';
import { UpdateUserDto } from './dto/update.user.dto';
import { UserService } from './user.service';

@UseGuards(AccessGuard)
@Controller('/api/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Patch()
  async updateUser(
    @UserDecorator('id') userId: number,
    @Body() dto: Omit<UpdateUserDto, 'userId'>,
  ): Promise<ResponseDto<User>> {
    const response: User = await this.userService.updateUser({ userId, ...dto });
    return ResponseDto.success(response, '사용자 정보 수정 성공');
  }
}
