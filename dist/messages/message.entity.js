"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "Message", {
    enumerable: true,
    get: function() {
        return Message;
    }
});
const _typeorm = require("typeorm");
const _basedto = require("../base.dto");
const _classvalidator = require("class-validator");
const _swagger = require("@nestjs/swagger");
const _chatsentity = require("../chats/chats.entity");
const _usersentity = require("../users/users.entity");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let Message = class Message extends _basedto.Base {
};
_ts_decorate([
    (0, _swagger.ApiProperty)({
        description: "Text's message"
    }),
    (0, _classvalidator.IsNotEmpty)(),
    (0, _typeorm.Column)({
        nullable: false
    }),
    _ts_metadata("design:type", String)
], Message.prototype, "text", void 0);
_ts_decorate([
    (0, _typeorm.ManyToOne)(()=>_chatsentity.Chat, (chat)=>chat.messages),
    _ts_metadata("design:type", typeof _chatsentity.Chat === "undefined" ? Object : _chatsentity.Chat)
], Message.prototype, "chat", void 0);
_ts_decorate([
    (0, _typeorm.ManyToOne)(()=>_usersentity.User, (user)=>user.messages),
    _ts_metadata("design:type", typeof _typeorm.Relation === "undefined" ? Object : _typeorm.Relation)
], Message.prototype, "author", void 0);
Message = _ts_decorate([
    (0, _typeorm.Entity)('messages')
], Message);
