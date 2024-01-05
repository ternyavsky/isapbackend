"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "Chat", {
    enumerable: true,
    get: function() {
        return Chat;
    }
});
const _typeorm = require("typeorm");
const _basedto = require("../base.dto");
const _classvalidator = require("class-validator");
const _swagger = require("@nestjs/swagger");
const _usersentity = require("../users/users.entity");
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
let Chat = class Chat extends _basedto.Base {
};
_ts_decorate([
    (0, _swagger.ApiProperty)({
        description: "Chat's title"
    }),
    (0, _classvalidator.MinLength)(2),
    (0, _classvalidator.MaxLength)(30),
    (0, _typeorm.Column)({
        unique: true,
        nullable: true
    }),
    _ts_metadata("design:type", String)
], Chat.prototype, "title", void 0);
_ts_decorate([
    (0, _typeorm.ManyToMany)(()=>_usersentity.User),
    (0, _typeorm.JoinTable)(),
    _ts_metadata("design:type", Array)
], Chat.prototype, "members", void 0);
_ts_decorate([
    (0, _classvalidator.IsNotEmpty)(),
    (0, _typeorm.OneToMany)(()=>_messageentity.Message, (message)=>message.chat),
    _ts_metadata("design:type", Array)
], Chat.prototype, "messages", void 0);
_ts_decorate([
    (0, _typeorm.OneToOne)(()=>_messageentity.Message),
    (0, _typeorm.JoinColumn)(),
    _ts_metadata("design:type", typeof _typeorm.Relation === "undefined" ? Object : _typeorm.Relation)
], Chat.prototype, "last_message", void 0);
Chat = _ts_decorate([
    (0, _typeorm.Entity)('chats')
], Chat);
