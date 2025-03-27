import { Injectable } from '@nestjs/common';
import { BaseJwtGuard } from './base.guard';

@Injectable()
export class AccessGuard extends BaseJwtGuard {
  constructor() {
    super('access', AccessGuard.name);
  }
}
