import { Column, Entity, JoinTable, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, Relation, Unique } from 'typeorm';
import { ROLE_ENUM } from './constants';
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
import { Message } from '../messages/message.entity';

@Entity('users')
export class User extends Base {
  @ApiProperty({ description: "User's username", })
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(20)
  @Column({ unique: true })
  username: string;

  @ApiProperty({ description: "User's password", })
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(20)
  @Column()
  password: string;



  @ApiProperty({ description: "User's online status" })
  @Column({ default: false })
  online: boolean;

  @ApiProperty({ enum: ROLE_ENUM, description: "User's role" })
  @Column({ type: 'enum', enum: ROLE_ENUM, default: ROLE_ENUM.USER })
  role: ROLE_ENUM;

  @ApiProperty({ description: "User's avatar url" })
  @Column({ nullable: true })
  img: string;

  @ApiProperty({ description: "User's messages" })
  @OneToMany(() => Message, (message) => message.author)
  messages: Message[]
}
