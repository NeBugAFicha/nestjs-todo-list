import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    try {
      const userData = jwt.verify(
        request.headers.token,
        process.env.JWT_SECRET_KEY,
      );
      if (!userData) {
        throw new DOMException();
      }
      request.headers.user_id = userData.id;
    } catch (error) {
      throw new UnauthorizedException();
    }
    return true;
  }
}
