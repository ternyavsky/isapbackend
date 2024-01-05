import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { Observable } from "rxjs";
import { jwtSecrets } from "./constants";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../users/users.entity";
import { Repository } from "typeorm";
import { JwtService } from "@nestjs/jwt";
import { Socket } from "socket.io";
import { WsException } from "@nestjs/websockets";
@Injectable()
export class WsGuard implements CanActivate {

    constructor(
        private jwtService: JwtService,
        private userService: UsersService,
    ) {
    }
    async canActivate(
        context: ExecutionContext,
    ): Promise<boolean> {
        try {
            const client: Socket = context.switchToWs().getClient<Socket>()
            const bearerToken = client.handshake.headers.authorization.split(' ')[1];
            if (!bearerToken) {
                throw new UnauthorizedException()
            }
            const decoded = await this.jwtService.verifyAsync(bearerToken, {
                secret: jwtSecrets.secret
            });
            const result = await this.userService.findOne(decoded.username)
            client.handshake.auth.user = result
            return Boolean(result)
        } catch (ex) {
            throw new WsException(ex.message)
        }
    }
}