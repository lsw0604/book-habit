import { Request } from 'express';
import { Body, Controller, Put, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AccessGuard } from 'src/auth/guard/access.guard';
import { UpdateUserDto } from './dto/update.user.dto';

@Controller('/api/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Put()
  @UseGuards(AccessGuard)
  async updateUserDto(@Req() req: Request, @Body() dto: UpdateUserDto) {
    const { id } = req.user;

    const user = await this.userService.updateUser({ id, dto });

    return user;
  }
}
