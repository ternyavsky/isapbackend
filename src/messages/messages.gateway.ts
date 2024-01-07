import { WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer } from '@nestjs/websockets';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { Server, Socket } from 'socket.io';
import { Message } from './message.entity';
import { WsGuard } from './messages.guard';
import { UseGuards } from '@nestjs/common';
import { User } from '../users/users.entity';
import { UsersService } from '../users/users.service';
@WebSocketGateway({
  cors: "*"
})
export class MessagesGateway {
  @WebSocketServer()
  private server: Server
  constructor(
    private readonly messagesService: MessagesService,
    private readonly userService: UsersService,
  ) { }

  @UseGuards(WsGuard)
  @SubscribeMessage('connectCall')
  async connect(client: Socket) {
    console.log("connect call")
    const userContext: User = client.handshake.auth.user
    const user = await this.messagesService.connectCall(userContext.username)
    this.server.emit("connectCall", user)
  }

  @UseGuards(WsGuard)
  @SubscribeMessage('changeUsername')
  async changeName(client: Socket, body) {
    const username: string = body["username"]
    const user = await this.userService.changeUser(username, client.handshake.auth.user)
    return this.server.emit("changeUsername", user)
  }



  @UseGuards(WsGuard)
  @SubscribeMessage('disconnectCall')
  async discnnet(client: Socket) {
    console.log('disconnect call')
    console.log(client.handshake.auth.user)
    const userContext: User = client.handshake.auth.user
    const user = await this.messagesService.disconnectCall(userContext.username)
    this.server.emit("disconnectCall", user)
  }

  @UseGuards(WsGuard)
  @SubscribeMessage('createMessage')
  async create(@MessageBody() message: Message) {
    const newMessage = await this.messagesService.create(message);
    console.log(newMessage, "new message")
    return this.server.emit("createMessage", newMessage)

  }

  @UseGuards(WsGuard)
  @SubscribeMessage('createFirstMessage')
  async createFirstMessage(client: Socket, body) {
    const user = body["user"]
    const message = body["message"]
    const authUser: User = client.handshake.auth.user
    const newChat = await this.messagesService.createFirstMessage(user, authUser.username, message)
    return this.server.emit("createFirstMessage", newChat)
  }

  @UseGuards(WsGuard)
  @SubscribeMessage('typing')
  async typing(client: Socket) {
    this.server.emit("typing", client.handshake.auth.user)
  }

  @SubscribeMessage('findAllMessages')
  findAll() {
    this.server.emit("findAllMessages", "Hello!")
    console.log(new Date())
    return this.messagesService.findAll();
  }

  @SubscribeMessage('findOneMessage')
  findOne(@MessageBody() id: number) {
    return this.messagesService.findOne(id);
  }

  @SubscribeMessage('updateMessage')
  update(@MessageBody() updateMessageDto: UpdateMessageDto) {
    return this.messagesService.update(updateMessageDto.id, updateMessageDto);
  }

  @SubscribeMessage('removeMessage')
  remove(@MessageBody() id: number) {
    return this.messagesService.remove(id);
  }
}
