import { Controller, Get, Query } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('/api/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findUserByEmail(@Query('email') email: string, @Query('id') id: string) {
    if (email) {
      return await this.userService.findUser({ email });
    } else if (id) {
      return await this.userService.findUser({ id: parseInt(id, 10) });
    } else {
      return await this.userService.findUser({ email, id: parseInt(id, 10) });
    }
  }
}
