import { User } from "src/users/users.entity";

export class CreateMessageDto {
    author: User
    text: string
}
