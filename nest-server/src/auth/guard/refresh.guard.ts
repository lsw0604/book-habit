import { Injectable } from '@nestjs/common';
import { BaseJwtGuard } from './base.guard';

@Injectable()
export class RefreshGuard extends BaseJwtGuard {
  constructor() {
    super('refresh', RefreshGuard.name);
  }
}
