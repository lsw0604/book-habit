import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserLocalRegisterDto } from './dto/user.local.register.dto';

@Injectable()
export class UserService {
  constructor(prismaService: PrismaService) {}

  async registerUser(dto: UserLocalRegisterDto) {}
}
