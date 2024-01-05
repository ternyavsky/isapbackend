"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "User", {
    enumerable: true,
    get: function() {
        return User;
    }
});
const _typeorm = require("typeorm");
const _constants = require("./constants");
const _basedto = require("../base.dto");
const _classvalidator = require("class-validator");
const _swagger = require("@nestjs/swagger");
const _messageentity = require("../messages/message.entity");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let User = class User extends _basedto.Base {
};
_ts_decorate([
    (0, _swagger.ApiProperty)({
        description: "User's username"
    }),
    (0, _classvalidator.IsNotEmpty)(),
    (0, _classvalidator.MinLength)(2),
    (0, _classvalidator.MaxLength)(20),
    (0, _typeorm.Column)({
        unique: true
    }),
    _ts_metadata("design:type", String)
], User.prototype, "username", void 0);
_ts_decorate([
    (0, _swagger.ApiProperty)({
        description: "User's password"
    }),
    (0, _classvalidator.IsNotEmpty)(),
    (0, _classvalidator.MinLength)(2),
    (0, _classvalidator.MaxLength)(20),
    (0, _typeorm.Column)(),
    _ts_metadata("design:type", String)
], User.prototype, "password", void 0);
_ts_decorate([
    (0, _swagger.ApiProperty)({
        description: "User's online status"
    }),
    (0, _typeorm.Column)({
        default: false
    }),
    _ts_metadata("design:type", Boolean)
], User.prototype, "online", void 0);
_ts_decorate([
    (0, _swagger.ApiProperty)({
        enum: _constants.ROLE_ENUM,
        description: "User's role"
    }),
    (0, _typeorm.Column)({
        type: 'enum',
        enum: _constants.ROLE_ENUM,
        default: _constants.ROLE_ENUM.USER
    }),
    _ts_metadata("design:type", typeof _constants.ROLE_ENUM === "undefined" ? Object : _constants.ROLE_ENUM)
], User.prototype, "role", void 0);
_ts_decorate([
    (0, _swagger.ApiProperty)({
        description: "User's avatar url"
    }),
    (0, _typeorm.Column)({
        nullable: true
    }),
    _ts_metadata("design:type", String)
], User.prototype, "img", void 0);
_ts_decorate([
    (0, _swagger.ApiProperty)({
        description: "User's messages"
    }),
    (0, _typeorm.OneToMany)(()=>_messageentity.Message, (message)=>message.author),
    _ts_metadata("design:type", Array)
], User.prototype, "messages", void 0);
User = _ts_decorate([
    (0, _typeorm.Entity)('users')
], User);
