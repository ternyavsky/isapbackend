"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "UsersController", {
    enumerable: true,
    get: function() {
        return UsersController;
    }
});
const _common = require("@nestjs/common");
const _usersservice = require("./users.service");
const _authguard = require("../auth/auth.guard");
const _express = require("express");
const _swagger = require("@nestjs/swagger");
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
let UsersController = class UsersController {
    changeUser(username, req) {
        return this.userService.changeUser(username, req['user']);
    }
    findAllUsers() {
        console.log(21);
        return this.userService.findAll();
    }
    findOneUser(username) {
        return this.userService.findOne(username);
    }
    constructor(userService){
        this.userService = userService;
    }
};
_ts_decorate([
    (0, _swagger.ApiQuery)({
        name: 'username'
    }),
    (0, _common.UseGuards)(_authguard.AuthGuard),
    (0, _common.Put)('/user/:username'),
    _ts_param(0, (0, _common.Param)('username')),
    _ts_param(1, (0, _common.Req)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String,
        typeof _express.Request === "undefined" ? Object : _express.Request
    ]),
    _ts_metadata("design:returntype", void 0)
], UsersController.prototype, "changeUser", null);
_ts_decorate([
    (0, _common.UseGuards)(_authguard.AuthGuard),
    (0, _common.Get)("/users"),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", []),
    _ts_metadata("design:returntype", void 0)
], UsersController.prototype, "findAllUsers", null);
_ts_decorate([
    (0, _common.UseGuards)(_authguard.AuthGuard),
    (0, _common.Get)("/users/:username"),
    _ts_param(0, (0, _common.Param)('username')),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String
    ]),
    _ts_metadata("design:returntype", void 0)
], UsersController.prototype, "findOneUser", null);
UsersController = _ts_decorate([
    (0, _common.Controller)('api'),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _usersservice.UsersService === "undefined" ? Object : _usersservice.UsersService
    ])
], UsersController);
