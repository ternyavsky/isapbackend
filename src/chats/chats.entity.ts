import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, Unique, Relation, OneToOne } from 'typeorm';
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
import { User } from '../users/users.entity';
import { Message } from '../messages/message.entity';

@Entity('chats')
export class Chat extends Base {
    @ApiProperty({
        description: "Chat's title",
    })
    @MinLength(2)
    @MaxLength(30)
    @Column({ unique: true, nullable: true })
    title: string;

    @ManyToMany(() => User)
    @JoinTable()
    members: Relation<User>[]

    @IsNotEmpty()
    @OneToMany(() => Message, message => message.chat)
    messages: Message[]

    @OneToOne(() => Message)
    @JoinColumn()
    last_message: Relation<Message>

}
