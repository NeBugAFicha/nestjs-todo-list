import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import * as jwt from 'jsonwebtoken';
@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const userData = jwt.verify(
      request.headers.token,
      process.env.JWT_SECRET_KEY,
    );
    if (!userData) {
      return false;
    }
    request.user_id = userData.id;
    return true;
  }
}
