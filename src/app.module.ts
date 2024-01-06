import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/users.entity';
import { DataSource } from 'typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ChatsController } from './chats/chats.controller';
import { ChatsModule } from './chats/chats.module';
import { Chat } from './chats/chats.entity';
import { MessagesModule } from './messages/messages.module';
import { Message } from './messages/message.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '172.17.0.1',
      username: 'postgres',
      password: 'postgres',
      port: 5432,
      database: 'postgres',
      synchronize: true,
      autoLoadEntities: true,
    }),
    UsersModule,
    ChatsModule,
    AuthModule,
    MessagesModule,
  ],
  controllers: [AppController, ChatsController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
