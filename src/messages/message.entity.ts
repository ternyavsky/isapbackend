import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, Unique, Relation } from 'typeorm';
import { Optional } from '@nestjs/common';
import { Base } from '../base.dto';
import {
    IsEmpty,
    IsNotEmpty,
    IsUrl,
    MaxLength,
    MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Chat } from '../chats/chats.entity';
import { User } from '../users/users.entity';

@Entity('messages')
export class Message extends Base {
    @ApiProperty({
        description: "Text's message",
    })

    @IsNotEmpty()
    @Column({ nullable: false })
    text: string;


    @ManyToOne(() => Chat, (chat) => chat.messages)
    chat: Chat


    @ManyToOne(() => User, user => user.messages)
    author: Relation<User>
}


