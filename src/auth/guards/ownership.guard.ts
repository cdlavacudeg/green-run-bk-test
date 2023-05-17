import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class OwnershipGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const locationIdUser = this.reflector.get<string>('locationIdUser', context.getHandler());

    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const { role, idUser } = user;
    const idUserRequest = request[locationIdUser].idUser;

    if (role == 'user' && idUser != idUserRequest) {
      // Deny access if the user is not the owner
      return false;
    }

    // Allow access if the user is the owner or the role is admin
    return true;
  }
}
