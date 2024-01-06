import { Injectable, Req } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Chat } from './chats.entity';
import { Repository } from 'typeorm';
import { User } from '../users/users.entity';
import { CreateChat } from './chats.dto';
import { Message } from '../messages/message.entity';

@Injectable()
export class ChatsService {
    constructor(
        @InjectRepository(Chat)
        private readonly chatRepository: Repository<Chat>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @InjectRepository(Message)
        private readonly messageRepository: Repository<Message>

    ) { }


    async findChatUser(user: User): Promise<Chat[]> {
        // const reqUser = await this.userRepository.findOneBy({ username: "Rudelf" })
        // const reqChat = await this.chatRepository.findOneBy({ id: 2 })
        // const message = this.messageRepository.create({ text: "Дмитрий, я тебя убью, сука!", author: user, chat: reqChat })
        // this.messageRepository.save(message)
        // console.log(reqChat)
        // const Chat = await this.userRepository.findOneBy({ username: "Rudelf" })
        // this.chatRepository.save(this.chatRepository.create({ title: "Sugar", members: [Chat, user] }))
        const chat = await this.chatRepository.find({
            relations: ["members", "messages", "last_message", "messages.author"]
        })
        // console.log(chat[0].messages, "messages")
        const resultArray = []
        for (let i in chat) {
            for (let j in chat[i].members) {
                if (chat[i].members[j].username === user.username) {
                    chat[i].messages.sort(function (a, b) {
                        if (new Date(a.created_at).getTime() > new Date(b.created_at).getTime()) {
                            return 1 
                        } else {
                            return -1
                        }
                    })
                    resultArray.push(chat[i])
                }
            }
        }
        return resultArray

    }

}
