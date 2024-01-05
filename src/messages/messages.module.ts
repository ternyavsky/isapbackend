import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesGateway } from './messages.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from './message.entity';
import { MessagesController } from './messages.controller';
import { JwtModule } from '@nestjs/jwt';
import { jwtSecrets } from './constants';
import { User } from '../users/users.entity';
import { UsersService } from '../users/users.service';
import { UsersModule } from '../users/users.module';
import { Chat } from '../chats/chats.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Message, User, Chat]),
  JwtModule.register({
    global: true,
    secret: jwtSecrets.secret,
    signOptions: { expiresIn: '7d' },
  }), UsersModule],
  providers: [MessagesGateway, MessagesService],
  exports: [MessagesService, TypeOrmModule],
  controllers: [MessagesController]
})
export class MessagesModule { }
