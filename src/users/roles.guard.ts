import { User } from './entities/user.entity';
import { Role } from './entities/role.enum';
import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";

@Injectable()
export class RolesGuard implements CanActivate{
    constructor(private reflector: Reflector){}

    canActivate(context: ExecutionContext): boolean {
        const requireRoles = this.reflector.getAllAndOverride<Role[]>('roles', [
            context.getHandler(),
            context.getClass(),
        ])

        if(!requireRoles){
            return true
        }

        const user: User = {
            name: 'Udam',
            roles: [Role.ADMIN]
        }

        return requireRoles.some(role => user.roles.includes(role))
    }
}