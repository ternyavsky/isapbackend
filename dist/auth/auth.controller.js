"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AuthController", {
    enumerable: true,
    get: function() {
        return AuthController;
    }
});
const _usersentity = require("../users/users.entity");
const _usersservice = require("../users/users.service");
const _authguard = require("./auth.guard");
const _authservice = require("./auth.service");
const _common = require("@nestjs/common");
const _express = require("express");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
function _ts_param(paramIndex, decorator) {
    return function(target, key) {
        decorator(target, key, paramIndex);
    };
}
let AuthController = class AuthController {
    signIn(signInDto) {
        return this.authService.signIn(signInDto.username, signInDto.password);
    }
    getProfile(req) {
        return req['user'];
    }
    TgAuthUser(user) {
        return this.userService.AuthTgUser(user);
    }
    CreateUser(user) {
        return this.userService.createUser(user);
    }
    constructor(authService, userService){
        this.authService = authService;
        this.userService = userService;
    }
};
_ts_decorate([
    (0, _common.HttpCode)(_common.HttpStatus.OK),
    (0, _common.Post)('login'),
    _ts_param(0, (0, _common.Body)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof Record === "undefined" ? Object : Record
    ]),
    _ts_metadata("design:returntype", void 0)
], AuthController.prototype, "signIn", null);
_ts_decorate([
    (0, _common.UseGuards)(_authguard.AuthGuard),
    (0, _common.Get)('user'),
    _ts_param(0, (0, _common.Req)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _express.Request === "undefined" ? Object : _express.Request
    ]),
    _ts_metadata("design:returntype", void 0)
], AuthController.prototype, "getProfile", null);
_ts_decorate([
    (0, _common.Post)('tguser'),
    _ts_param(0, (0, _common.Body)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _usersentity.User === "undefined" ? Object : _usersentity.User
    ]),
    _ts_metadata("design:returntype", void 0)
], AuthController.prototype, "TgAuthUser", null);
_ts_decorate([
    (0, _common.Post)('user'),
    _ts_param(0, (0, _common.Body)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _usersentity.User === "undefined" ? Object : _usersentity.User
    ]),
    _ts_metadata("design:returntype", void 0)
], AuthController.prototype, "CreateUser", null);
AuthController = _ts_decorate([
    (0, _common.Controller)('api'),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _authservice.AuthService === "undefined" ? Object : _authservice.AuthService,
        typeof _usersservice.UsersService === "undefined" ? Object : _usersservice.UsersService
    ])
], AuthController);
