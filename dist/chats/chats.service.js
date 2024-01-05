"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ChatsService", {
    enumerable: true,
    get: function() {
        return ChatsService;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _chatsentity = require("./chats.entity");
const _typeorm1 = require("typeorm");
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
function _ts_param(paramIndex, decorator) {
    return function(target, key) {
        decorator(target, key, paramIndex);
    };
}
let ChatsService = class ChatsService {
    async findChatUser(user) {
        // const reqUser = await this.userRepository.findOneBy({ username: "Rudelf" })
        // const reqChat = await this.chatRepository.findOneBy({ id: 2 })
        // const message = this.messageRepository.create({ text: "Дмитрий, я тебя убью, сука!", author: user, chat: reqChat })
        // this.messageRepository.save(message)
        // console.log(reqChat)
        // const Chat = await this.userRepository.findOneBy({ username: "Rudelf" })
        // this.chatRepository.save(this.chatRepository.create({ title: "Sugar", members: [Chat, user] }))
        const chat = await this.chatRepository.find({
            relations: [
                "members",
                "messages",
                "last_message",
                "messages.author"
            ]
        });
        // console.log(chat[0].messages, "messages")
        const resultArray = [];
        for(let i in chat){
            for(let j in chat[i].members){
                if (chat[i].members[j].username === user.username) {
                    resultArray.push(chat[i]);
                }
            }
        }
        return resultArray;
    }
    constructor(chatRepository, userRepository, messageRepository){
        this.chatRepository = chatRepository;
        this.userRepository = userRepository;
        this.messageRepository = messageRepository;
    }
};
ChatsService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_param(0, (0, _typeorm.InjectRepository)(_chatsentity.Chat)),
    _ts_param(1, (0, _typeorm.InjectRepository)(_usersentity.User)),
    _ts_param(2, (0, _typeorm.InjectRepository)(_messageentity.Message)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository
    ])
], ChatsService);
