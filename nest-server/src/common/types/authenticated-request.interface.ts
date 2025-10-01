import { Request } from 'express';
import { AuthUser } from 'src/types/express';

export interface AuthenticatedRequest extends Request {
  user: AuthUser;
}
