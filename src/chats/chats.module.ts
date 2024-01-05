import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Chat } from './chats.entity';
import { ChatsController } from './chats.controller';
import { ChatsService } from './chats.service';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtSecrets } from './constants';
import { Message } from '../messages/message.entity';
import { User } from '../users/users.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Chat, Message, User]),
        UsersModule,
    JwtModule.register({
        global: true,
        secret: jwtSecrets.secret,
        signOptions: { expiresIn: '7d' },
    }),
    ],
    providers: [ChatsService],
    exports: [ChatsService, TypeOrmModule],
    controllers: [ChatsController],
})
export class ChatsModule { }
