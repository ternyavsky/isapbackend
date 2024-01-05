"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ChatsModule", {
    enumerable: true,
    get: function() {
        return ChatsModule;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _chatsentity = require("./chats.entity");
const _chatscontroller = require("./chats.controller");
const _chatsservice = require("./chats.service");
const _usersmodule = require("../users/users.module");
const _jwt = require("@nestjs/jwt");
const _constants = require("./constants");
const _messageentity = require("../messages/message.entity");
const _usersentity = require("../users/users.entity");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let ChatsModule = class ChatsModule {
};
ChatsModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _typeorm.TypeOrmModule.forFeature([
                _chatsentity.Chat,
                _messageentity.Message,
                _usersentity.User
            ]),
            _usersmodule.UsersModule,
            _jwt.JwtModule.register({
                global: true,
                secret: _constants.jwtSecrets.secret,
                signOptions: {
                    expiresIn: '7d'
                }
            })
        ],
        providers: [
            _chatsservice.ChatsService
        ],
        exports: [
            _chatsservice.ChatsService,
            _typeorm.TypeOrmModule
        ],
        controllers: [
            _chatscontroller.ChatsController
        ]
    })
], ChatsModule);
