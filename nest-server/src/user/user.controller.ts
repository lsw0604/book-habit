import { Request } from 'express';
import { User } from '@prisma/client';
import { Body, Controller, Logger, Put, Req, UseGuards, UseInterceptors } from '@nestjs/common';
import { UserService } from './user.service';
import { AccessGuard } from 'src/auth/guard/access.guard';
import { OmitPropertyInterceptor } from 'src/interceptors/omit-property.interceptor';
import { UpdateUserDto } from './dto/update.user.dto';

@Controller('/api/user')
export class UserController {
  readonly logger = new Logger(UserController.name);
  constructor(private readonly userService: UserService) {}
  @Put()
  @UseGuards(AccessGuard)
  @UseInterceptors(new OmitPropertyInterceptor<User, 'password'>('password'))
  async updateUserDto(@Req() req: Request, @Body() dto: UpdateUserDto) {
    this.logger.debug(req.user);
    const { id } = req.user as User;

    const user = await this.userService.updateUser(id, dto);

    return user;
  }
}
