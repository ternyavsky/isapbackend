import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from './message.entity';
import { Repository } from 'typeorm';
import { User } from '../users/users.entity';
import { Chat } from '../chats/chats.entity';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Chat)
    private readonly chatRepository: Repository<Chat>
  ) { }

  async connectCall(username: string): Promise<User> {
    console.log(username)
    const user = await this.userRepository.findOneBy({ username: username })
    console.log(user)
    user.online = true
    return await this.userRepository.save(user)
  }

  async createFirstMessage(user: User, authUser: string, message: Message): Promise<Chat> {
    const twoUser = await this.userRepository.findOneBy({ username: authUser })
    const firstUser = await this.userRepository.findOneBy({ username: user.username })
    const newChat = await this.chatRepository.save(this.chatRepository.create({ members: [twoUser, firstUser] }))
    await this.messageRepository.save(this.messageRepository.create({author: twoUser, text: message.text, chat: newChat}))
    return newChat

  }

  async disconnectCall(username: string): Promise<User> {
    const user = await this.userRepository.findOneBy({ username: username })
    user.online = false
    return await this.userRepository.save(user)
  }

  async create(createMessageDto: CreateMessageDto) {
    const message = this.messageRepository.create(createMessageDto)
    return await this.messageRepository.save(message)
    // return this.messageRepository.findOneBy({ id: message.id })
  }

  findAll() {
    return `This action returns all messages`;
  }

  findOne(id: number) {
    return `This action returns a #${id} message`;
  }

  update(id: number, updateMessageDto: UpdateMessageDto) {
    return `This action updates a #${id} message`;
  }

  remove(id: number) {
    return `This action removes a #${id} message`;
  }
}
