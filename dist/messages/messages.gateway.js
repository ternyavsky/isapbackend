"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "MessagesGateway", {
    enumerable: true,
    get: function() {
        return MessagesGateway;
    }
});
const _websockets = require("@nestjs/websockets");
const _messagesservice = require("./messages.service");
const _updatemessagedto = require("./dto/update-message.dto");
const _socketio = require("socket.io");
const _messageentity = require("./message.entity");
const _messagesguard = require("./messages.guard");
const _common = require("@nestjs/common");
const _usersservice = require("../users/users.service");
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
let MessagesGateway = class MessagesGateway {
    async connect(client) {
        console.log("connect call");
        const userContext = client.handshake.auth.user;
        const user = await this.messagesService.connectCall(userContext.username);
        this.server.emit("connectCall", user);
    }
    async changeName(client, body) {
        const username = body["username"];
        const user = await this.userService.changeUser(username, client.handshake.auth.user);
        return this.server.emit("changeUsername", user);
    }
    async discnnet(client) {
        console.log('disconnect call');
        console.log(client.handshake.auth.user);
        const userContext = client.handshake.auth.user;
        const user = await this.messagesService.disconnectCall(userContext.username);
        this.server.emit("disconnectCall", user);
    }
    async create(message) {
        const newMessage = await this.messagesService.create(message);
        console.log(newMessage, "new message");
        return this.server.emit("createMessage", newMessage);
    }
    async createFirstMessage(client, body) {
        const user = body["user"];
        const message = body["message"];
        const authUser = client.handshake.auth.user;
        const newChat = await this.messagesService.createFirstMessage(user, authUser.username, message);
        return this.server.emit("createFirstMessage", newChat);
    }
    async typing(client) {
        this.server.emit("typing", client.handshake.auth.user);
    }
    findAll() {
        this.server.emit("findAllMessages", "Hello!");
        console.log(new Date());
        return this.messagesService.findAll();
    }
    findOne(id) {
        return this.messagesService.findOne(id);
    }
    update(updateMessageDto) {
        return this.messagesService.update(updateMessageDto.id, updateMessageDto);
    }
    remove(id) {
        return this.messagesService.remove(id);
    }
    constructor(messagesService, userService){
        this.messagesService = messagesService;
        this.userService = userService;
    }
};
_ts_decorate([
    (0, _websockets.WebSocketServer)(),
    _ts_metadata("design:type", typeof _socketio.Server === "undefined" ? Object : _socketio.Server)
], MessagesGateway.prototype, "server", void 0);
_ts_decorate([
    (0, _common.UseGuards)(_messagesguard.WsGuard),
    (0, _websockets.SubscribeMessage)('connectCall'),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _socketio.Socket === "undefined" ? Object : _socketio.Socket
    ]),
    _ts_metadata("design:returntype", Promise)
], MessagesGateway.prototype, "connect", null);
_ts_decorate([
    (0, _common.UseGuards)(_messagesguard.WsGuard),
    (0, _websockets.SubscribeMessage)('changeUsername'),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _socketio.Socket === "undefined" ? Object : _socketio.Socket,
        void 0
    ]),
    _ts_metadata("design:returntype", Promise)
], MessagesGateway.prototype, "changeName", null);
_ts_decorate([
    (0, _common.UseGuards)(_messagesguard.WsGuard),
    (0, _websockets.SubscribeMessage)('disconnectCall'),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _socketio.Socket === "undefined" ? Object : _socketio.Socket
    ]),
    _ts_metadata("design:returntype", Promise)
], MessagesGateway.prototype, "discnnet", null);
_ts_decorate([
    (0, _common.UseGuards)(_messagesguard.WsGuard),
    (0, _websockets.SubscribeMessage)('createMessage'),
    _ts_param(0, (0, _websockets.MessageBody)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _messageentity.Message === "undefined" ? Object : _messageentity.Message
    ]),
    _ts_metadata("design:returntype", Promise)
], MessagesGateway.prototype, "create", null);
_ts_decorate([
    (0, _common.UseGuards)(_messagesguard.WsGuard),
    (0, _websockets.SubscribeMessage)('createFirstMessage'),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _socketio.Socket === "undefined" ? Object : _socketio.Socket,
        void 0
    ]),
    _ts_metadata("design:returntype", Promise)
], MessagesGateway.prototype, "createFirstMessage", null);
_ts_decorate([
    (0, _common.UseGuards)(_messagesguard.WsGuard),
    (0, _websockets.SubscribeMessage)('typing'),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _socketio.Socket === "undefined" ? Object : _socketio.Socket
    ]),
    _ts_metadata("design:returntype", Promise)
], MessagesGateway.prototype, "typing", null);
_ts_decorate([
    (0, _websockets.SubscribeMessage)('findAllMessages'),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", []),
    _ts_metadata("design:returntype", void 0)
], MessagesGateway.prototype, "findAll", null);
_ts_decorate([
    (0, _websockets.SubscribeMessage)('findOneMessage'),
    _ts_param(0, (0, _websockets.MessageBody)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        Number
    ]),
    _ts_metadata("design:returntype", void 0)
], MessagesGateway.prototype, "findOne", null);
_ts_decorate([
    (0, _websockets.SubscribeMessage)('updateMessage'),
    _ts_param(0, (0, _websockets.MessageBody)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _updatemessagedto.UpdateMessageDto === "undefined" ? Object : _updatemessagedto.UpdateMessageDto
    ]),
    _ts_metadata("design:returntype", void 0)
], MessagesGateway.prototype, "update", null);
_ts_decorate([
    (0, _websockets.SubscribeMessage)('removeMessage'),
    _ts_param(0, (0, _websockets.MessageBody)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        Number
    ]),
    _ts_metadata("design:returntype", void 0)
], MessagesGateway.prototype, "remove", null);
MessagesGateway = _ts_decorate([
    (0, _websockets.WebSocketGateway)({
        cors: "*"
    }),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _messagesservice.MessagesService === "undefined" ? Object : _messagesservice.MessagesService,
        typeof _usersservice.UsersService === "undefined" ? Object : _usersservice.UsersService
    ])
], MessagesGateway);
