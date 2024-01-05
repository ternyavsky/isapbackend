"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "MessagesService", {
    enumerable: true,
    get: function() {
        return MessagesService;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _messageentity = require("./message.entity");
const _typeorm1 = require("typeorm");
const _usersentity = require("../users/users.entity");
const _chatsentity = require("../chats/chats.entity");
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
let MessagesService = class MessagesService {
    async connectCall(username) {
        console.log(username);
        const user = await this.userRepository.findOneBy({
            username: username
        });
        console.log(user);
        user.online = true;
        return await this.userRepository.save(user);
    }
    async createFirstMessage(user, authUser, message) {
        const twoUser = await this.userRepository.findOneBy({
            username: authUser
        });
        const firstUser = await this.userRepository.findOneBy({
            username: user.username
        });
        const newChat = await this.chatRepository.save(this.chatRepository.create({
            members: [
                twoUser,
                firstUser
            ]
        }));
        await this.messageRepository.save(this.messageRepository.create({
            author: twoUser,
            text: message.text,
            chat: newChat
        }));
        return newChat;
    }
    async disconnectCall(username) {
        const user = await this.userRepository.findOneBy({
            username: username
        });
        user.online = false;
        return await this.userRepository.save(user);
    }
    async create(createMessageDto) {
        const message = this.messageRepository.create(createMessageDto);
        return await this.messageRepository.save(message);
    // return this.messageRepository.findOneBy({ id: message.id })
    }
    findAll() {
        return `This action returns all messages`;
    }
    findOne(id) {
        return `This action returns a #${id} message`;
    }
    update(id, updateMessageDto) {
        return `This action updates a #${id} message`;
    }
    remove(id) {
        return `This action removes a #${id} message`;
    }
    constructor(messageRepository, userRepository, chatRepository){
        this.messageRepository = messageRepository;
        this.userRepository = userRepository;
        this.chatRepository = chatRepository;
    }
};
MessagesService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_param(0, (0, _typeorm.InjectRepository)(_messageentity.Message)),
    _ts_param(1, (0, _typeorm.InjectRepository)(_usersentity.User)),
    _ts_param(2, (0, _typeorm.InjectRepository)(_chatsentity.Chat)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository
    ])
], MessagesService);
