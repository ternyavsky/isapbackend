"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "MessagesModule", {
    enumerable: true,
    get: function() {
        return MessagesModule;
    }
});
const _common = require("@nestjs/common");
const _messagesservice = require("./messages.service");
const _messagesgateway = require("./messages.gateway");
const _typeorm = require("@nestjs/typeorm");
const _messageentity = require("./message.entity");
const _messagescontroller = require("./messages.controller");
const _jwt = require("@nestjs/jwt");
const _constants = require("./constants");
const _usersentity = require("../users/users.entity");
const _usersmodule = require("../users/users.module");
const _chatsentity = require("../chats/chats.entity");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let MessagesModule = class MessagesModule {
};
MessagesModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _typeorm.TypeOrmModule.forFeature([
                _messageentity.Message,
                _usersentity.User,
                _chatsentity.Chat
            ]),
            _jwt.JwtModule.register({
                global: true,
                secret: _constants.jwtSecrets.secret,
                signOptions: {
                    expiresIn: '7d'
                }
            }),
            _usersmodule.UsersModule
        ],
        providers: [
            _messagesgateway.MessagesGateway,
            _messagesservice.MessagesService
        ],
        exports: [
            _messagesservice.MessagesService,
            _typeorm.TypeOrmModule
        ],
        controllers: [
            _messagescontroller.MessagesController
        ]
    })
], MessagesModule);
