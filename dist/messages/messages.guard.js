"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "WsGuard", {
    enumerable: true,
    get: function() {
        return WsGuard;
    }
});
const _common = require("@nestjs/common");
const _usersservice = require("../users/users.service");
const _constants = require("./constants");
const _jwt = require("@nestjs/jwt");
const _websockets = require("@nestjs/websockets");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let WsGuard = class WsGuard {
    async canActivate(context) {
        try {
            const client = context.switchToWs().getClient();
            const bearerToken = client.handshake.headers.authorization.split(' ')[1];
            if (!bearerToken) {
                throw new _common.UnauthorizedException();
            }
            const decoded = await this.jwtService.verifyAsync(bearerToken, {
                secret: _constants.jwtSecrets.secret
            });
            const result = await this.userService.findOne(decoded.username);
            client.handshake.auth.user = result;
            return Boolean(result);
        } catch (ex) {
            throw new _websockets.WsException(ex.message);
        }
    }
    constructor(jwtService, userService){
        this.jwtService = jwtService;
        this.userService = userService;
    }
};
WsGuard = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _jwt.JwtService === "undefined" ? Object : _jwt.JwtService,
        typeof _usersservice.UsersService === "undefined" ? Object : _usersservice.UsersService
    ])
], WsGuard);
