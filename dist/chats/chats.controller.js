"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ChatsController", {
    enumerable: true,
    get: function() {
        return ChatsController;
    }
});
const _common = require("@nestjs/common");
const _chatsservice = require("./chats.service");
const _authguard = require("../auth/auth.guard");
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
let ChatsController = class ChatsController {
    getChats(req) {
        return this.chatService.findChatUser(req["user"]);
    }
    constructor(chatService){
        this.chatService = chatService;
    }
};
_ts_decorate([
    (0, _common.UseGuards)(_authguard.AuthGuard),
    (0, _common.Get)("/chats"),
    _ts_param(0, (0, _common.Req)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof Request === "undefined" ? Object : Request
    ]),
    _ts_metadata("design:returntype", void 0)
], ChatsController.prototype, "getChats", null);
ChatsController = _ts_decorate([
    (0, _common.Controller)('api'),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _chatsservice.ChatsService === "undefined" ? Object : _chatsservice.ChatsService
    ])
], ChatsController);
